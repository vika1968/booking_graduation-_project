
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.static("client"));

import adminRoutes from "./API/admin/adminRoutes";
app.use("/api/admin", adminRoutes);

import hotelsRoutes from "./API/hotels/hotelsRoutes";
app.use("/api/hotels", hotelsRoutes);

import roomsRoutes from "./API/rooms/roomsRoutes";
app.use("/api/rooms", roomsRoutes);

import usersRoutes from "./API/users/usersRoutes";
app.use("/api/users", usersRoutes);

import ordersRoutes from "./API/orders/ordersRoutes";
app.use("/api/orders", ordersRoutes); 

app.listen(port, () => {
  console.log(`MySql server is running on port ${port}`);
});
