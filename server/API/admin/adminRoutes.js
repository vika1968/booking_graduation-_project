"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminCtrl_1 = require("./adminCtrl");
const adminRouter = express_1.default.Router();
adminRouter
    // .get("/:id", getAdminByID)
    .get("/retrieve/get-admin-by-cookie", adminCtrl_1.getAdmin)
    .post("/login", adminCtrl_1.login)
    .post("/register", adminCtrl_1.register);
exports.default = adminRouter;
