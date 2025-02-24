const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create a transporter using SMTP or any other mail service (e.g., Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use another mail service like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address (e.g., your Gmail)
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Send an email
const sendEmail = async (to, subject, text, dateTime) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to, // recipient address
      subject, // Subject line
      text, // email body
    });
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
