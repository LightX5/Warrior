import express from "express";
import { createBooking, getBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.route("/").post(createBooking).get(getBookings);

export default router;
