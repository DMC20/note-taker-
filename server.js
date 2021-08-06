// Dependecies 
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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

// Route to db.json file 
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
})

// Route to homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// Post note
app.post('/api/notes', (req, res) => {
   const {title, text } = req.body;
   let newArr;
     
   fs.readFile('db/db.json', function (err, data){
    let arr = JSON.parse(data);
    let newNote ={ title, text, id: uuidv4()};
    newArr = [...arr, newNote];
    
    fs.writeFileSync('db/db.json', JSON.stringify(newArr))
    });
    res.json({ok:true})
})

// Delete note 
app.delete('/api/notes/:id', (req, res) => {

})

// Listen to port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});