import express from "express";
import {   
    createHotel,
    deleteHotel,
    getHotel,
    getHotelByID,
    getHotelRooms,
    getHotels,
    updateHotel,getHotelByName,getHotelPhotoByID} from "./hotelsCtrl";

const hotelsRouter = express.Router();

hotelsRouter
.post("/", createHotel)
.put("/:id", updateHotel)
.delete("/:id", deleteHotel)
.get("/find/:id", getHotel)
.get("/findByID/:id", getHotelByID)
.get("/findHotelPhoto/:id", getHotelPhotoByID)
.get("/find/:name", getHotelByName)
.get("/", getHotels)  // client part
.get("/room/:id", getHotelRooms)

export default hotelsRouter;