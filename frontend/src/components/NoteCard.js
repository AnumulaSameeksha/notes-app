import React from "react";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">
      <div className="note-card-body">
        <h3 className="note-title">{note.title}</h3>
        <p className="note-content">{note.content}</p>
      </div>
      <div className="note-card-footer">
        <span className="note-date">{formatDate(note.updated_at)}</span>
        <div className="note-actions">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => onEdit(note)}
            title="Edit note"
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(note.id)}
            title="Delete note"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
