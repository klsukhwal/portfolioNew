const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes for the About, Projects, and Contact sections
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/about.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/projects.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/contact.html'));
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Store the contact information in a text file
  const contactData = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;
  fs.appendFile('contact.txt', contactData, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error occurred while saving contact information.');
    }

    // Redirect to the "thankyou" page
    res.redirect('/thankyou');
  });
});

app.get('/thankyou', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/thankyou.html'));
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
