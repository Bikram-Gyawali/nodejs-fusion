// Importing nodemailer for email operationsconst nodemailer = require('nodemailer');class EmailSender {  // Initialization with SMTP options  constructor(smtpOptions) {    this.transporter = nodemailer.createTransport(smtpOptions);  }  // Method for sending emails  async sendEmail(from, to, subject, text) {    await this.transporter.sendMail({from, to, subject, text});  }}// Importing nodemailer for email operations
const nodemailer = require('nodemailer');

class EmailSender {
  // Initialization with SMTP options
  constructor(smtpOptions) {
    this.transporter = nodemailer.createTransport(smtpOptions);
  }
  // Method for sending emails
  async sendEmail(from, to, subject, text) {
    await this.transporter.sendMail({from, to, subject, text});
  }
}