import mongoose from "mongoose";
import { ContactMessage } from "../models/ContactMessage.js";
import { fallbackMessages } from "../store/fallbackStore.js";
import {
  canSendEmailNotifications,
  dispatchEmailInBackground,
  sendContactNotification,
} from "../services/bookingEmailService.js";

const hasDatabaseConnection = () => mongoose.connection.readyState === 1;

export const createContactMessage = async (req, res, next) => {
  const normalizedContactMessage = {
    name: String(req.body.name || "").trim(),
    email: String(req.body.email || "").trim(),
    message: String(req.body.message || "").trim(),
  };

  const { name, email, message } = normalizedContactMessage;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Name, email, and message are required.",
    });
  }

  try {
    let contactMessage;

    if (!hasDatabaseConnection()) {
      contactMessage = {
        id: `fallback-message-${Date.now()}`,
        ...normalizedContactMessage,
        createdAt: new Date().toISOString(),
      };

      fallbackMessages.unshift(contactMessage);
    } else {
      contactMessage = await ContactMessage.create(normalizedContactMessage);
    }

    const storedInFallback = !hasDatabaseConnection();

    if (canSendEmailNotifications()) {
      dispatchEmailInBackground(
        () => sendContactNotification(normalizedContactMessage),
        "Contact email failed"
      );
    }

    const messageText = canSendEmailNotifications()
      ? "Message sent successfully. Email notification is being delivered to warriorlensmedia@gmail.com."
      : storedInFallback
        ? "Message saved in local fallback storage. Add MongoDB and Gmail app password settings to enable full delivery."
        : "Message saved successfully, but email notifications are not configured yet.";

    return res.status(201).json({
      message: messageText,
      contactMessage,
      notificationQueued: canSendEmailNotifications(),
    });
  } catch (error) {
    return next(error);
  }
};
