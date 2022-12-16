// TODO: connect Frontend to Backend
// TODO: deploy to Heroku
// TODO: add demo video + README


// TODO: add fs.readFile to get request directly(?)

const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

function noteAdder(body) {
    var note = body;
  fs.readFile("./db/db.json", function (err, data) {
    var json = JSON.parse(data);
    json.push(note);
    fs.writeFile("./db/db.json", JSON.stringify(json, null, 2), function (err) {
      if (err) throw err;
      console.log("New note successfully appended!");
    });
  });
  return note;
}

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res) => {
    const note = noteAdder(req.body);
    res.json(note);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
