# Notespace — Full-Stack Notes App

A complete CRUD notes application built with React (frontend) and Python Flask (backend).

## Folder Structure

```
notes-app/
├── backend/
│   ├── app.py              # Flask REST API + SQLite setup
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js          # Root component, state & API calls
│       ├── App.css         # All styles
│       ├── index.js        # React entry point
│       └── components/
│           ├── NoteList.js # Renders grid of notes
│           ├── NoteCard.js # Single note card (edit/delete)
│           └── NoteForm.js # Create / edit form
└── README.md
```

## Setup Instructions

### Backend (Flask)

```bash
# 1. Navigate to backend folder
cd notes-app/backend

# 2. Create a virtual environment
python3 -m venv venv

# 3. Activate the virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run the Flask server
python app.py
```

The backend will start at: http://localhost:5000

### Frontend (React)

Open a **new terminal tab/window**, then:

```bash
# 1. Navigate to frontend folder
cd notes-app/frontend

# 2. Install Node dependencies
npm install

# 3. Start the React dev server
npm start
```

The frontend will open at: http://localhost:3000

## API Endpoints

| Method | URL             | Description       |
|--------|-----------------|-------------------|
| GET    | /notes          | Fetch all notes   |
| POST   | /notes          | Create a note     |
| PUT    | /notes/:id      | Update a note     |
| DELETE | /notes/:id      | Delete a note     |

## Requirements

- Python 3.8+
- Node.js 16+
- npm 7+
