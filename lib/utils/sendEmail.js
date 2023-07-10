const transporter = require('../config/mailConn');

// Function to send an email with an attachment
async function sendEmail({ message = '', recipients = [], subject = '', attachments = [] }) {
  try {
    // Define the email options
    const mailOptions = {
      from: process.env.email,
      to: recipients,
      subject: subject,
      text: message,
      attachments
    };

    // Send the email
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    throw {
      message,
      recipients,
      subject,
      attachments,
      error
    }
  }
}
module.exports = sendEmail