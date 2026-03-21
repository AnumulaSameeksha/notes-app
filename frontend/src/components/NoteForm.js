import React, { useState, useEffect } from "react";

export default function NoteForm({ note, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }
    try {
      setSaving(true);
      if (note) {
        await onSubmit(note.id, title.trim(), content.trim());
      } else {
        await onSubmit(title.trim(), content.trim());
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="form-card">
      <h2 className="form-title">{note ? "Edit Note" : "New Note"}</h2>
      {error && <div className="form-error">{error}</div>}
      <form onSubmit={handleSubmit} className="note-form">
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your note a title..."
            autoFocus
          />
        </div>
        <div className="field">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            rows={6}
          />
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : note ? "Save Changes" : "Create Note"}
          </button>
        </div>
      </form>
    </div>
  );
}
