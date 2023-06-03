import express from "express";
import {
  getBookingById,
  newBooking,
  newBookingBatch
} from "./bookingCtrl";

const bookingsRouter = express.Router();

bookingsRouter.get("/:id", getBookingById);
bookingsRouter.post("/", newBooking);
bookingsRouter.post("/batch",newBookingBatch);

export default bookingsRouter;
