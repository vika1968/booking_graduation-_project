"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let connection;
let environment = process.env.ENVIRONMENT;
if (environment === "DEV") {
    const sqlPassword_Dev = process.env.SQLPASSWORD_DEV;
    const sqlUser_Dev = process.env.SQLUSER_DEV;
    const sqlDB_Name_Dev = process.env.DATABASE_DEV;
    const sqlHost_Dev = process.env.HOST_DEV;
    connection = mysql2_1.default.createConnection({
        host: sqlHost_Dev,
        port: 3306,
        user: sqlUser_Dev,
        password: sqlPassword_Dev,
        database: sqlDB_Name_Dev,
        multipleStatements: true,
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
}
else {
    const sqlPassword_Prod = process.env.SQLPASSWORD_PROD;
    const sqlUser_Prod = process.env.SQLUSER_PROD;
    const sqlDB_Name_Prod = process.env.DATABASE_PROD;
    const sqlHost_Prod = process.env.HOST_PROD;
    connection = mysql2_1.default.createConnection({
        host: sqlHost_Prod,
        port: 3306,
        user: sqlUser_Prod,
        password: sqlPassword_Prod,
        database: sqlDB_Name_Prod,
        multipleStatements: true,
    });
    console.log(`Current DataBase is : ${sqlDB_Name_Prod}`);
    connection.connect((err) => {
        if (err) {
            console.trace(err);
            return;
        }
        console.info("🔥 MySQL is connected 🛢");
        connection.on("error", (err) => {
            if (err.fatal) {
                console.trace("Fatal error: " + err.message);
            }
        });
    });
}
exports.default = connection;
