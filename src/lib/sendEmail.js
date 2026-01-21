import nodemailer from 'nodemailer';
import {
  emailHost,
  emailPort,
  emailAddress,
  emailPass,
  emailFrom
} from '../core/config/config.js';

const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!emailHost || !emailPort || !emailAddress || !emailPass || !emailFrom) {
      throw new Error(
        'Missing email configuration in environment (EMAIL_HOST, EMAIL_PORT, EMAIL_ADDRESS, EMAIL_PASS, EMAIL_FROM).'
      );
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: parseInt(emailPort),
      secure: parseInt(emailPort) === 465, // true for 465, false for other ports
      auth: {
        user: emailAddress,
        pass: emailPass
      }
    });

    // Send email
    const result = await transporter.sendMail({
      from: emailFrom,
      to,
      subject,
      html
    });

    return { success: true, id: result?.messageId };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

export default sendEmail;
