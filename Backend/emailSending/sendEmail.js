

import nodemailer from "nodemailer";

export const sendEmail = async ({ name, email, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: process.env.RECEIVER_EMAIL, 
      subject: `New Message from ${name}`,
      text: `${message}\n\nUser's Email: ${email}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message || error);
    throw new Error("Failed to send email.");
  }
};
