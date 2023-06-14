"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../../utils/verifyToken");
const hotelsCtrl_1 = require("./hotelsCtrl");
const hotelsRouter = express_1.default.Router();
hotelsRouter
    //   .get("/:id", getUserByID)
    //   .get("/retrieve/get-user-by-cookie", getUser)  
    //   .post("/login", login)
    //   .post("/register", register)
    //   .put("/update-user", updateUser)
    //   .delete("/:id", deleteUser)
    //CREATE
    //.post("/", verifyAdmin, createHotel)
    .post("/", hotelsCtrl_1.createHotel)
    //UPDATE
    .put("/:id", verifyToken_1.verifyAdmin, hotelsCtrl_1.updateHotel)
    //DELETE
    .delete("/:id", hotelsCtrl_1.deleteHotel)
    //GET
    .get("/find/:id", hotelsCtrl_1.getHotel)
    .get("/find/:name", hotelsCtrl_1.getHotelByName)
    //GET ALL
    .get("/", hotelsCtrl_1.getHotels)
    .get("/countByCity", hotelsCtrl_1.countByCity)
    .get("/countByType", hotelsCtrl_1.countByType)
    .get("/room/:id", hotelsCtrl_1.getHotelRooms);
exports.default = hotelsRouter;
