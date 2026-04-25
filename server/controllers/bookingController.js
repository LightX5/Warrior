import mongoose from "mongoose";
import { Booking } from "../models/Booking.js";
import { fallbackBookings } from "../store/fallbackStore.js";
import {
  canSendEmailNotifications,
  dispatchEmailInBackground,
  sendBookingNotification,
} from "../services/bookingEmailService.js";

const hasDatabaseConnection = () => mongoose.connection.readyState === 1;

const toBookingEmailPayload = (bookingRecord) => {
  const plainBooking =
    typeof bookingRecord?.toObject === "function" ? bookingRecord.toObject() : bookingRecord;

  return {
    name: String(plainBooking?.name || "").trim(),
    email: String(plainBooking?.email || "").trim(),
    phone: String(plainBooking?.phone || "").trim(),
    service: String(plainBooking?.service || "").trim(),
    duration: String(plainBooking?.duration || "").trim(),
    date:
      plainBooking?.date instanceof Date
        ? plainBooking.date.toISOString().split("T")[0]
        : String(plainBooking?.date || "").trim(),
    location: String(plainBooking?.location || "").trim(),
    message: String(plainBooking?.message || "").trim(),
  };
};

export const createBooking = async (req, res, next) => {
  const normalizedBooking = {
    name: String(req.body.name || "").trim(),
    email: String(req.body.email || "").trim(),
    phone: String(req.body.phone || "").trim(),
    service: String(req.body.service || "").trim(),
    duration: String(req.body.duration || "").trim(),
    date: String(req.body.date || "").trim(),
    location: String(req.body.location || "").trim(),
    message: String(req.body.message || "").trim(),
  };

  const { name, email, phone, service, duration, date, location, message } = normalizedBooking;

  if (!name || !email || !phone || !service || !duration || !date || !location || !message) {
    return res.status(400).json({
      message:
        "Name, email, phone, service, duration, date, location, and message are required.",
    });
  }

  try {
    let booking;

    if (!hasDatabaseConnection()) {
      booking = {
        id: `fallback-booking-${Date.now()}`,
        ...normalizedBooking,
        createdAt: new Date().toISOString(),
      };

      fallbackBookings.unshift(booking);
    } else {
      booking = await Booking.create({
        ...normalizedBooking,
      });
    }

    const emailPayload = toBookingEmailPayload(booking);

    const storedInFallback = !hasDatabaseConnection();

    if (canSendEmailNotifications()) {
      dispatchEmailInBackground(
        () => sendBookingNotification(emailPayload),
        "Booking email failed"
      );
    }

    const messageText = canSendEmailNotifications()
      ? "Booking request saved successfully. Email notification is being delivered to warriorlensmedia@gmail.com."
      : storedInFallback
        ? "Booking request saved in local fallback storage. Add MongoDB and Gmail app password settings to enable full delivery."
        : "Booking request saved successfully, but email notifications are not configured yet.";

    return res.status(201).json({
      message: messageText,
      booking,
      notificationQueued: canSendEmailNotifications(),
    });
  } catch (error) {
    return next(error);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    if (!hasDatabaseConnection()) {
      return res.status(200).json({
        count: fallbackBookings.length,
        bookings: fallbackBookings,
      });
    }

    const bookings = await Booking.find().sort({ createdAt: -1 });

    return res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return next(error);
  }
};
