"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersCtrl_1 = require("./usersCtrl");
const userRouter = express_1.default.Router();
userRouter
    .get("/", usersCtrl_1.getUsers)
    .get("/:id", usersCtrl_1.getUserByID)
    .get("/retrieve/get-user-by-session/:sesStor", usersCtrl_1.getUserBySessionStorage)
    .post("/login", usersCtrl_1.login)
    .post("/register", usersCtrl_1.register)
    .delete("/:id", usersCtrl_1.deleteUser);
exports.default = userRouter;
