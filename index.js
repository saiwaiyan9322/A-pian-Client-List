const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve frontend page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve login.txt content
app.get('/login', (req, res) => {
  const filePath = path.join(__dirname, 'login.txt');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading login.txt');
    res.send(`<pre>${data}</pre>`);
  });
});

// Serve data.txt content
app.get('/data', (req, res) => {
  const filePath = path.join(__dirname, 'data.txt');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data.txt');
    res.send(`<pre>${data}</pre>`);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
