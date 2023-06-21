import express from "express";

import { getRooms, createRoom, deleteRoom, getRoomTypes } from "./roomsCtrl";

const roomsRouter = express.Router();

roomsRouter
    .get("/", getRooms)
    .get("/room-types", getRoomTypes)
    .delete("/:id", deleteRoom)
    .post("/:hotelID", createRoom);
export default roomsRouter;