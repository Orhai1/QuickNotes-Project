import React, { useState } from "react";
import '../css-components/Note.css';
import { CATEGORY_COLORS } from "./categories";

const Note = ({ note, onDelete, onClick }) => {
    const bg = CATEGORY_COLORS[note.category] || "#fff";

    return (
        <div className="note" onClick={onClick} style={{ backgroundColor: bg }}>
            <div className="note-header">
                <div className="date-info">
                    <p>Created: {new Date(note.dateCreated).toLocaleString()}</p>
                    {note.dateUpdated && (
                        <p>Updated: {new Date(note.dateUpdated).toLocaleString()}</p>
                        )}
                    </div>
                 <button className="delete-button"
                 // Prevent the click from propagating to the note click handler
                    onClick={(e) => {e.stopPropagation();  onDelete(note.id);}}>
                        X
                    </button>
            </div>
            <div className="note-content">
            <p>Category: {note.category}</p>
            <h2>{note.title}</h2>
            <p>{note.text}</p>
           </div>
        </div>
    );
};
export default Note;