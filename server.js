// Dependecies 
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Express setup
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Route to notes pages/files 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// Post note
app.post('/api/notes', (req, res) => {
   const {title, text} = req.body;
   let newArr;
     
   fs.readFile('db/db.json', (err, data) => {
    let arr = JSON.parse(data);
    let newNote = { title, text, id: uuidv4()};
    newArr = [...arr, newNote];
    
    fs.writeFileSync('db/db.json', JSON.stringify(newArr))
    });
    res.json({ok:true})
})

// Delete note 
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    let noteArr = JSON.parse(fs.readFileSync("db/db.json"));

    noteArr = noteArr.filter(note => {
        return note.id != id;
    })

    fs.writeFileSync("db/db.json", JSON.stringify(noteArr));
    res.json({ok:true});
})

// Listen to port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});