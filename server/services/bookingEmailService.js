import nodemailer from "nodemailer";

const defaultRecipient = "warriorlensmedia@gmail.com";
const defaultStudioName = "Warrior Lens Studio";
let cachedTransporter;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getEmailConfig = () => {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER || defaultRecipient;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || "";
  const recipient = process.env.BOOKING_NOTIFICATION_EMAIL || defaultRecipient;

  return {
    user,
    pass,
    recipient,
  };
};

export const canSendEmailNotifications = () => {
  const { user, pass, recipient } = getEmailConfig();

  return Boolean(user && pass && recipient);
};

const createTransporter = () => {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const { user, pass } = getEmailConfig();

  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    pool: true,
    maxConnections: 1,
    maxMessages: 100,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    auth: {
      user,
      pass,
    },
  });

  return cachedTransporter;
};

const sendNotificationEmail = async ({
  recipient,
  replyTo,
  subject,
  text,
  html,
  skippedReason,
}) => {
  const { user } = getEmailConfig();

  if (!canSendEmailNotifications()) {
    return {
      sent: false,
      skipped: true,
      reason: skippedReason,
    };
  }

  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"${defaultStudioName}" <${user}>`,
    to: recipient,
    replyTo,
    subject,
    text,
    html,
  });

  return {
    sent: true,
    skipped: false,
  };
};

const formatPlainText = (booking) => [
  "New Warrior Lens booking request",
  "",
  `Name: ${booking.name}`,
  `Email: ${booking.email}`,
  `Phone: ${booking.phone}`,
  `Service: ${booking.service}`,
  `Duration: ${booking.duration}`,
  `Preferred Date: ${booking.date}`,
  `Location: ${booking.location}`,
  "",
  "Message:",
  booking.message,
].join("\n");

const formatHtml = (booking) => `
  <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
    <h2 style="margin-bottom: 16px;">New Warrior Lens booking request</h2>
    <table cellpadding="8" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(booking.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(booking.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(booking.phone)}</td></tr>
      <tr><td><strong>Service</strong></td><td>${escapeHtml(booking.service)}</td></tr>
      <tr><td><strong>Duration</strong></td><td>${escapeHtml(booking.duration)}</td></tr>
      <tr><td><strong>Preferred Date</strong></td><td>${escapeHtml(booking.date)}</td></tr>
      <tr><td><strong>Location</strong></td><td>${escapeHtml(booking.location)}</td></tr>
    </table>
    <div style="margin-top: 16px;">
      <strong>Message</strong>
      <p style="margin-top: 8px;">${escapeHtml(booking.message)}</p>
    </div>
  </div>
`;

export const sendBookingNotification = async (booking) => {
  const { recipient } = getEmailConfig();

  return sendNotificationEmail({
    recipient,
    replyTo: booking.email,
    subject: `New booking request from ${booking.name}`,
    text: formatPlainText(booking),
    html: formatHtml(booking),
    skippedReason:
      "Email notifications are not configured yet. Add GMAIL_APP_PASSWORD (or SMTP_PASS) to enable Gmail delivery.",
  });
};

const formatContactPlainText = (contactMessage) => [
  "New Warrior Lens contact message",
  "",
  `Name: ${contactMessage.name}`,
  `Email: ${contactMessage.email}`,
  "",
  "Message:",
  contactMessage.message,
].join("\n");

const formatContactHtml = (contactMessage) => `
  <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
    <h2 style="margin-bottom: 16px;">New Warrior Lens contact message</h2>
    <table cellpadding="8" cellspacing="0" border="0" style="border-collapse: collapse;">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(contactMessage.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(contactMessage.email)}</td></tr>
    </table>
    <div style="margin-top: 16px;">
      <strong>Message</strong>
      <p style="margin-top: 8px;">${escapeHtml(contactMessage.message)}</p>
    </div>
  </div>
`;

export const sendContactNotification = async (contactMessage) => {
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || getEmailConfig().recipient;

  return sendNotificationEmail({
    recipient,
    replyTo: contactMessage.email,
    subject: `New contact message from ${contactMessage.name}`,
    text: formatContactPlainText(contactMessage),
    html: formatContactHtml(contactMessage),
    skippedReason:
      "Contact email notifications are not configured yet. Add GMAIL_APP_PASSWORD (or SMTP_PASS) to enable Gmail delivery.",
  });
};

export const dispatchEmailInBackground = (emailTask, failureLabel) => {
  setImmediate(() => {
    void emailTask().catch((error) => {
      console.error(`${failureLabel}:`, error.message);
    });
  });
};
