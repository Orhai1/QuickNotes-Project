import React, { useState } from "react";
import Note from './note.jsx';
import '../css-components/Home.css';

import Modal from "react-modal";
Modal.setAppElement("#root");

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState({
        title: "",
        text: ""
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    const addNote = (text) => {
        const newNote = {
        id: Date.now(),
        title: noteText.title,
        text: noteText.text,
        dateCreated: new Date(),
        dateUpdated: null
        };

        setNotes([...notes, newNote]);
        setNoteText({
            title: "",
            text: ""
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
      <br/>
      <button id="add-button" onClick={addNote}>Add Note</button>
      
      <div className="notes-list">
        {notes.map((note) => (
          <Note key={note.id} note={note} onDelete={deleteNote} onClick={() => openEdit(note)} />
        ))}
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