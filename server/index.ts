
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

import usersRoutes from "./API/users/usersRoutes";
app.use("/api/users", usersRoutes);

import hotelsRoutes from "./API/hotels/hotelsRoutes";
app.use("/api/hotels", hotelsRoutes);


import roomsRoutes from "./API/rooms/roomsRoutes";
app.use("/api/rooms", roomsRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
