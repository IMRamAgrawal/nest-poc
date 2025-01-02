import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure the transporter with your SMTP details
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
      port: 587, // e.g., 587
      // secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // e.g., your email address
        pass: process.env.SMTP_PASS, // your email password or app-specific password
      },
    });
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const mail = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Password Reset Request',
      text: `Please click on the following link to reset your password: ${resetLink}`,
      html: `
        <p>Hello,</p>
        <p>You have requested to reset your password.</p>
        <p>Please click on the following link to reset your password:</p>
        <p><a href="${resetLink}">Reset Password</a></p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    try {
      // Send the email
      const info = await this.transporter.sendMail(mail);
      console.log('Email sent: ', info.messageId);
    } catch (error) {
      console.error('Error sending email', error);
      throw error;
    }
  }
}
