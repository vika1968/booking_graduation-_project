"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomsCtrl_1 = require("./roomsCtrl");
const roomsRouter = express_1.default.Router();
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
    .get("/", roomsCtrl_1.getRooms)
    .get("/room-types", roomsCtrl_1.getRoomTypes)
    .delete("/:id", roomsCtrl_1.deleteRoom)
    .post("/:hotelID", roomsCtrl_1.createRoom);
exports.default = roomsRouter;
