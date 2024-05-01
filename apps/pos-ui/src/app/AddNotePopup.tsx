// AddCNotePopup.js
import React, { useState } from 'react';
import './AddNotePopup.css';

function AddNotePopup({ onClose, onAddNote }: { onClose: any; onAddNote: any }) {
    const [note, setNote] = useState('');

    const handleNote = () => {
        onAddNote(note);
        onClose();
    };

    return (
        <div className="add-customer-popup">
            <div className="popup-content">
                <h2>Add Note</h2>
                <input
                    className='search-input'
                    type="text"
                    placeholder="Add note here..."
                    maxLength={60}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <button onClick={handleNote}>Add Note</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default AddNotePopup;
