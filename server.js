import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the "public" directory
app.use(express.static(join(__dirname, '')));

// Parse URL-encoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes for the About, Projects, and Contact sections
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(join(__dirname, '/about.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(join(__dirname, '/projects.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(join(__dirname, '/contact.html'));
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
  res.sendFile(join(__dirname, '/thankyou.html'));
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
