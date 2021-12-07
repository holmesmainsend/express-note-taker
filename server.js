// TODO: create/test POST route
// TODO: format Frontend
// TODO: connect Frontend to Backend
// TODO: deploy to Heroku
// TODO: add demo video + README

const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

function createNewNote(body, noteData) {
    const note = body;
    noteData.push(note);
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify({ noteData }, null, 2)
    );
    return note;
  }

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res) => {
    const note = createNewNote(req.body, noteData);
    res.json(note);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});