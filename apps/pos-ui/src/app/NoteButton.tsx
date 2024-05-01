import React, { useState } from 'react';
import AddNotePopup from './AddNotePopup';

function NoteButton({ onAddNote }: { onAddNote: any }) {
  const [showPopup, setShowPopup] = useState(false);
  const [note, setNote] = useState('');

  const handleAddNote = (note: string | null) => {
    if (note) {
      setNote(note);
    }
    onAddNote(note);
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button onClick={handleButtonClick}>{note ? <>Note: {note}</> : 'Add Note'}</button>
      {showPopup && (
        <AddNotePopup onClose={handleClosePopup} onAddNote={handleAddNote} />
      )}
      
    </>
  );
}

export default NoteButton;
