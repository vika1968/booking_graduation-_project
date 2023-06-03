"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
require("dotenv").config();
const sqlPassword = process.env.SQLPASSWORD;
const connection = mysql2_1.default.createConnection({
    host: "localhost",
    port: 3306,
    user: "max",
    password: sqlPassword,
    database: "hotel-booking",
    multipleStatements: true //-- multiple queries with each connect
});
//console.log(connection.authorized)
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
