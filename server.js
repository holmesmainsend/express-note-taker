const express = require('express');
const path = require('path');
// const noteData = require('db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// app.get('/api/notes', (req, res) => res.json(noteData));

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});