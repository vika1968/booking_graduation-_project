import express from "express";
import {verifyAdmin} from "../../utils/verifyToken"
import {   countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getHotel,
    getHotelRooms,
    getHotels,
    updateHotel,getHotelByName} from "./hotelsCtrl";

const hotelsRouter = express.Router();

hotelsRouter
//   .get("/:id", getUserByID)
//   .get("/retrieve/get-user-by-cookie", getUser)  
//   .post("/login", login)
//   .post("/register", register)
//   .put("/update-user", updateUser)
//   .delete("/:id", deleteUser)
//CREATE
//.post("/", verifyAdmin, createHotel)
.post("/", createHotel)

//UPDATE
.put("/:id", updateHotel)

//DELETE
.delete("/:id", deleteHotel)

//GET
.get("/find/:id", getHotel)
.get("/find/:name", getHotelByName)

//GET ALL
.get("/", getHotels)
.get("/countByCity", countByCity)
.get("/countByType", countByType)
.get("/room/:id", getHotelRooms)

export default hotelsRouter;