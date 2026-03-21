import React from "react";
import NoteCard from "./NoteCard";

export default function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h2>No notes yet</h2>
        <p>Click "New Note" above to get started.</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
