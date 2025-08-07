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
    const [activeNote, setActiveNote] = useState(null);

    const addNote = (text) => {
        const newNote = {
        id: Date.now(),
        title: noteText.title,
        text: noteText.text,
        date: new Date()
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

    const openModal = (note) => {
    setActiveNote(note);
    setIsModalOpen(true);
    };

    const closeModal = () => {
    setIsModalOpen(false);
    setActiveNote(null);
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
          <Note key={note.id} note={note} onDelete={deleteNote} onClick={() => openModal(note)} />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Note Modal"
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
        {activeNote && (
          <div>
            <h3>Note Details</h3>
            <p><strong>Date:</strong> {new Date(activeNote.date).toLocaleString()}</p>
            <p><strong>Text:</strong> {activeNote.text}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;