"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
//require("dotenv").config();
//OR
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sqlPassword = process.env.SQLPASSWORD;
const sqlUser = process.env.SQLUSER;
const connection = mysql2_1.default.createConnection({
    host: "localhost",
    port: 3306,
    user: sqlUser,
    password: sqlPassword,
    database: "hotel-booking",
    multipleStatements: true
});
connection.connect((err) => {
    try {
        if (err)
            throw err;
        console.info("🔥 MySQL is connected 🛢 ");
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = connection;
