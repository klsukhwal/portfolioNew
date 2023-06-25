import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.static(join(__dirname, '')));


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/index.html'));
});


app.get('/contact', (req, res) => {
  res.sendFile(join(__dirname, '/contact.html'));
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;


  const contactData = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;
  fs.appendFile('contact.txt', contactData, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error occurred while saving contact information.');
    }

   
    res.redirect('/thankyou');
  });
});


const port = 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
