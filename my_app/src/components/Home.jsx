import React, { useState } from "react";
import Note from './note.jsx';
import '../css-components/Home.css'; // Assuming you have a CSS file for styling

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState("");

    const addNote = (text) => {
        const newNote = {
        id: Date.now(),
        text: noteText,
        date: new Date()
        };

        setNotes([...notes, newNote]);
        setNoteText(""); 
  };

  return (
    <div className="home-container">
     <textarea
        placeholder="Your note..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        className="note-input"
      />
      <br/>
      <button id="add-button" onClick={addNote}>Add Note</button>
      
      <div className="notes-list">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Home;