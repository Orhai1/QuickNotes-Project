import React, { useState } from "react";
import '../css-components/Note.css'

const Note = ({ note, onDelete }) => {

    return (
        <div className="note">
            <div className="note-header">
                <p>{new Date(note.date).toLocaleString()}</p>
                <button className="delete-button" onClick={() => onDelete(note.id)}>X</button>
            </div>
            <div className="note-content">
            <h2>{note.title}</h2>
            <p>{note.text}</p>
           </div>
        </div>
    );
};
export default Note;