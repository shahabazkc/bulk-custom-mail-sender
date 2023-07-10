const nodemailer = require('nodemailer');

// Create a transporter using your email service provider's SMTP configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  pool: true, // This is the field you need to add
  auth: {
    user: process.env.email,
    pass: process.env.password
  }
});

module.exports = transporter