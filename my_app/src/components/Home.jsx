import React, { useState } from "react";
import Note from './note.jsx';
import '../css-components/Home.css';
import { CATEGORY_COLORS, CATEGORIES } from "./categories";

import Modal from "react-modal";
Modal.setAppElement("#root");

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState({
        title: "",
        text: "",
        category: "Personal"
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

  
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [searchInput, setSearchInput] = useState("");   
    const [searchResults, setSearchResults] = useState("");

    const addNote = () => {
        const newNote = {
        id: Date.now(),
        title: noteText.title,
        text: noteText.text,
        category: noteText.category,
        dateCreated: new Date(),
        dateUpdated: null
        };

        setNotes([...notes, newNote]);
        setNoteText({
            title: "",
            text: "",
            category: "Personal"
        });
    };

    const deleteNote = (id) => {
        let confirm = window.confirm("Are you sure you want to delete your note?" );
        if (confirm) {
            setNotes(notes.filter(note => note.id !== id));
        }
    };

    const openEdit = (note) => {
      setSelectedNote({ ...note });
      setIsModalOpen(true);
    };

    const saveEdit = () => {
        const updatedNote = {
            ...selectedNote,
            dateUpdated: new Date(),
        };
        setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
        setSelectedNote(null);
        setIsModalOpen(false);
    };

    //Search text in note's content
    const handleSearch = () => setSearchResults(searchInput.trim());
    const clearSearch  = () => { setSearchInput(""); setSearchResults(""); };

    // Filter notes based on text and category
    let displayNotes = notes;
    if (categoryFilter !== "All") {
      displayNotes = displayNotes.filter((n) => n.category === categoryFilter);
    }
    const text = searchResults.trim().toLowerCase();
    if (text) {
      displayNotes = displayNotes.filter(
        (n) =>
          n.title.toLowerCase().includes(text) ||
          n.text.toLowerCase().includes(text)
      );
    }


  return (
    <div className="home-container">
    <textarea
        placeholder="Title"
        value={noteText.title}
        onChange={(e) => setNoteText({ ...noteText, title: e.target.value })}
        className="note-input title-input"
    />

    <textarea
        placeholder="Your note..."
        value={noteText.text}
        onChange={(e) => setNoteText({ ...noteText, text: e.target.value })}
        className="note-input text-input"
      />

      <select
        value={noteText.category}
        onChange={(e) => setNoteText({ ...noteText, category: e.target.value })}
        className="category-select"
      >
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <button id="add-button" onClick={addNote}>Add Note</button>
      
      <div className="category-filters">
        <button
          onClick={() => setCategoryFilter("All")}
        >
          Show All
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="search-cotainer">
        <input
          type="search"
          placeholder="Search note"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch}>Search</button>
        {searchResults  && <button onClick={clearSearch}>Clear</button>}
      </div>


      <div className="notes-list">
        {displayNotes.length === 0 ? (
          <>
            {searchResults ? `No results for "${searchResults}"` : "No notes yet."}
          </>
        ) : (
          displayNotes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onClick={() => openEdit(note)}
            />
          ))
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            maxWidth: "400px",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px"
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }
        }}
      >
        {selectedNote && (
          <div>
            <textarea
              value={selectedNote.title}
              onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
                className="note-input title-input"
            />
            <br />
            <textarea
              value={selectedNote.text}
              onChange={(e) => setSelectedNote({ ...selectedNote, text: e.target.value })}
                className="note-input text-input"
            />
            <select
              value={selectedNote.category}
              onChange={e => setSelectedNote({ ...selectedNote, category: e.target.value })}
            >
              {CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)}
            </select>
            <div className="modal-buttons">
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>  
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;