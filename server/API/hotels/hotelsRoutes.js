"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotelsCtrl_1 = require("./hotelsCtrl");
const hotelsRouter = express_1.default.Router();
hotelsRouter
    .post("/", hotelsCtrl_1.createHotel)
    .put("/:id", hotelsCtrl_1.updateHotel)
    .delete("/:id", hotelsCtrl_1.deleteHotel)
    .get("/find/:id", hotelsCtrl_1.getHotel)
    .get("/findByID/:id", hotelsCtrl_1.getHotelByID)
    .get("/findHotelPhoto/:id", hotelsCtrl_1.getHotelPhotoByID)
    .get("/find/:name", hotelsCtrl_1.getHotelByName)
    .get("/", hotelsCtrl_1.getHotels) // client part
    .get("/countByCity", hotelsCtrl_1.countByCity)
    .get("/countByType", hotelsCtrl_1.countByType)
    .get("/room/:id", hotelsCtrl_1.getHotelRooms);
exports.default = hotelsRouter;
