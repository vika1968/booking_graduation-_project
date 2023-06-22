import express from "express";

import { getRooms, createRoom, deleteRoom, getRoomTypes, updateRoomAvailability } from "./roomsCtrl";

const roomsRouter = express.Router();

roomsRouter
    .get("/", getRooms)
    .get("/room-types", getRoomTypes)
    .delete("/:id", deleteRoom)
    .post("/:hotelID", createRoom)
    .put("/availability/:id", updateRoomAvailability);
export default roomsRouter;