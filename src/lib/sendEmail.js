import { Resend } from 'resend';
import { resendApiKey, emailFrom } from '../core/config/config.js';

const resend = new Resend(resendApiKey);

const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!resendApiKey) {
      throw new Error('Missing RESEND_API_KEY in environment.');
    }

    const result = await resend.emails.send({
      from: emailFrom,
      to,
      subject,
      html
    });

    if (result?.error) {
      throw new Error(result.error.message || 'Resend email send failed');
    }

    return { success: true, id: result?.data?.id };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

export default sendEmail;
