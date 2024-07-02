const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000' // Update this to match your client's URL
}));

// Test route to check if server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
  const { to_email, subject, message } = req.body;

  console.log('Email User:', 'help@smartcookie.in');
  console.log('Email Pass:', 'Smartcookie@2020');

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465, // Use 465 for secure connections
    secure: true,
    auth: {
      user: 'help@smartcookie.in', // Use environment variable for email
      pass: 'Smartcookie@2020', // Use environment variable for password
    },
  });

  // Email options
  const mailOptions = {
    from: 'help@smartcookie.in', // sender address
    to: to_email, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send(error.toString());
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent: ' + info.response);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
