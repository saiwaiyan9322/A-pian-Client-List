const fs = require('fs');
const path = require('path');

// Serve login.txt content
app.get('/login', (req, res) => {
  const filePath = path.join(__dirname, 'login.txt');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading login.txt');
    } else {
      res.send(`<pre>${data}</pre>`); // HTML pre tag မှာ ပြ
    }
  });
});
