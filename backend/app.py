from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), "notes.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()


@app.route("/notes", methods=["GET"])
def get_notes():
    conn = get_db()
    notes = conn.execute("SELECT * FROM notes ORDER BY updated_at DESC").fetchall()
    conn.close()
    return jsonify([dict(note) for note in notes])


@app.route("/notes", methods=["POST"])
def create_note():
    data = request.get_json()
    title = data.get("title", "").strip()
    content = data.get("content", "").strip()

    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400

    conn = get_db()
    cursor = conn.execute("INSERT INTO notes (title, content) VALUES (?, ?)", (title, content))
    conn.commit()
    note = conn.execute("SELECT * FROM notes WHERE id = ?", (cursor.lastrowid,)).fetchone()
    conn.close()
    return jsonify(dict(note)), 201


@app.route("/notes/<int:note_id>", methods=["PUT"])
def update_note(note_id):
    data = request.get_json()
    title = data.get("title", "").strip()
    content = data.get("content", "").strip()

    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400

    conn = get_db()
    existing = conn.execute("SELECT id FROM notes WHERE id = ?", (note_id,)).fetchone()
    if not existing:
        conn.close()
        return jsonify({"error": "Note not found"}), 404

    conn.execute(
        "UPDATE notes SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        (title, content, note_id),
    )
    conn.commit()
    note = conn.execute("SELECT * FROM notes WHERE id = ?", (note_id,)).fetchone()
    conn.close()
    return jsonify(dict(note))


@app.route("/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    conn = get_db()
    existing = conn.execute("SELECT id FROM notes WHERE id = ?", (note_id,)).fetchone()
    if not existing:
        conn.close()
        return jsonify({"error": "Note not found"}), 404

    conn.execute("DELETE FROM notes WHERE id = ?", (note_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Note deleted successfully"})


if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
