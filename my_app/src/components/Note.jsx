import React, { useState } from "react";
import '../css-components/Note.css'

const Note = ({ note }) => {

    return (
        <div className="note">
            <p>{note.text}</p>
            <p>{new Date(note.date).toLocaleString()}</p>
        </div>
    );
};
export default Note;