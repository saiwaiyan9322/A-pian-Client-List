const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const loginFile = path.join(__dirname, 'login.txt');
  fs.readFile(loginFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading login.txt');

    // Simple check: username/password exist in login.txt (each line: username,password)
    const lines = data.split('\n');
    const valid = lines.some(line => {
      const [u, p] = line.trim().split(',');
      return u === username && p === password;
    });

    if (valid) {
      res.redirect('/data');
    } else {
      res.send('Invalid credentials. <a href="/login">Try again</a>');
    }
  });
});

// Serve data.txt only after successful login
app.get('/data', (req, res) => {
  const dataFile = path.join(__dirname, 'data.txt');
  fs.readFile(dataFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data.txt');
    res.send(`<pre>${data}</pre>`);
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
