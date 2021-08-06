// Dependecies 
const express = require('express');
const fs = require('fs');
const path = require('path');

// Express setup
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Route to notes pages 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Route to DB json file 
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
})

// Route to homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// Post note
app.post('/api/notes', (req, res) => {

})




// Delete note 
app.delete('/api/notes/:id', (req, res) => {

})

// Listen to port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});