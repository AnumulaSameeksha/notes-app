import React, { useState, useEffect } from "react";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import "./App.css";

const API_URL = "https://notes-app-z8ae.onrender.com/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError("Could not connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(title, content) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (!res.ok) throw new Error("Failed to create note");
    const newNote = await res.json();
    setNotes((prev) => [newNote, ...prev]);
    setShowForm(false);
  }

  async function handleUpdate(id, title, content) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (!res.ok) throw new Error("Failed to update note");
    const updated = await res.json();
    setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
    setEditingNote(null);
    setShowForm(false);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this note?")) return;
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete note");
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function handleEdit(note) {
    setEditingNote(note);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingNote(null);
    setShowForm(false);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">✦</span>
            <h1>Notespace</h1>
          </div>
          {!showForm && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              + New Note
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        {error && <div className="error-banner">{error}</div>}

        {showForm && (
          <NoteForm
            note={editingNote}
            onSubmit={editingNote ? handleUpdate : handleCreate}
            onCancel={handleCancel}
          />
        )}

        {loading ? (
          <div className="loading">
            <div className="spinner" />
            <p>Loading notes...</p>
          </div>
        ) : (
          <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}
