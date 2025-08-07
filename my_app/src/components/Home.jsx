import React, { useState } from "react";
import Note from './note.jsx';
import '../css-components/Home.css';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState({
        title: "",
        text: ""
    });

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
          <Note key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </div>
    </div>
  );
};

export default Home;