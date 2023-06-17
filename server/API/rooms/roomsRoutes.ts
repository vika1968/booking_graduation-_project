import express from "express";
import {verifyAdmin} from "../../utils/verifyToken"
import { getRooms, createRoom, deleteRoom, getRoomTypes} from "./roomsCtrl";

const roomsRouter = express.Router();

roomsRouter
//   .get("/:id", getUserByID)
//   .get("/retrieve/get-user-by-cookie", getUser)  
//   .post("/login", login)
//   .post("/register", register)
//   .put("/update-user", updateUser)
//   .delete("/:id", deleteUser)
// //CREATE
// //.post("/", verifyAdmin, createHotel)
// .post("/", createHotel)

// //UPDATE
// .put("/:id", verifyAdmin, updateHotel)

// //DELETE
// .delete("/:id", deleteHotel)

// //GET
// .get("/find/:id", getHotel)

// //GET ALL
// .get("/", getHotels)
// .get("/countByCity", countByCity)
// .get("/countByType", countByType)
// .get("/room/:id", getHotelRooms)
.get("/", getRooms)
.get("/room-types", getRoomTypes)
.delete("/:id", deleteRoom)
.post("/:hotelID",  createRoom);
export default roomsRouter;