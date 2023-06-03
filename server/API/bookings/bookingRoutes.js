"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingCtrl_1 = require("./bookingCtrl");
const bookingsRouter = express_1.default.Router();
bookingsRouter.get("/:id", bookingCtrl_1.getBookingById);
bookingsRouter.post("/", bookingCtrl_1.newBooking);
bookingsRouter.post("/batch", bookingCtrl_1.newBookingBatch);
exports.default = bookingsRouter;
