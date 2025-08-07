import React, { useState } from "react";
import '../css-components/Note.css'

const Note = ({ note, onDelete }) => {

    return (
        <div className="note">
            <div className="note-header">
                <p>{new Date(note.date).toLocaleString()}</p>
                <button className="delete-button" onClick={() => onDelete(note.id)}>X</button>
            </div>
            <p>{note.text}</p>
           
        </div>
    );
};
export default Note;