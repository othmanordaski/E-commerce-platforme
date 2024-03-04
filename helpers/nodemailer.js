const nodemailer = require('nodemailer')
require('dotenv').config()

const MAIL_ADDRESS = process.env.MAIL_ADDRESS;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

exports.sendMailRegister = async (username, email) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: MAIL_ADDRESS,
      pass: MAIL_PASSWORD
    }
  });

  // Mail template
  const mailTemplate = `
    <h1>Welcome</h1>
    <p>Hello ${username},</p>
    <p>Thank you for your registration!</p>
  `;

  // Mail options
  const mailOptions = {
    from: MAIL_ADDRESS,
    to: email,
    subject: 'Welcome to Our Platform',
    html: mailTemplate
  };

  try {
    // Send mail and await response
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail Sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
