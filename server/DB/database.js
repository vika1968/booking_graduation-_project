"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
//require("dotenv").config();
//OR another way 
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sqlPassword = process.env.SQLPASSWORD;
// const sqlUser = process.env.SQLUSER; 
// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: sqlUser,
//   password: sqlPassword,
//   database: "hotel-booking",
//   multipleStatements: true 
// });
// connection.connect((err) => {
//   try {
//     if (err) throw err;
//     console.info("🔥 MySQL is connected 🛢 ");
//   } catch (error) {
//     console.error(error);
//   }
// });
// export default connection;
//--MySqlfreeHosting------------
// Your account number is: 789066
// Your new database is now ready to use.
// To connect to your database use these details
// Server: sql7.freemysqlhosting.net
// Name: sql7633384
// Username: sql7633384
// Password: T4Y6Xmgu5T
// Port number: 3306
const connection = mysql2_1.default.createConnection({
    host: "sql7.freemysqlhosting.net",
    port: 3306,
    user: "sql7633384",
    password: "T4Y6Xmgu5T",
    database: "sql7633384",
    multipleStatements: true
});
// var del=connection._protocol._delegateError;
// connection._protocol._delegateError =  function(err, sequence){
//  if(err.fatal){
//   console.trace('fatal error: ' + err.message)
//  } 
//  return del.call(this, err, sequence)
// }
connection.connect((err) => {
    if (err) {
        console.trace(err);
        return;
    }
    console.info("🔥 MySQL is connected 🛢");
    connection.on('error', (err) => {
        if (err.fatal) {
            console.trace('Fatal error: ' + err.message);
        }
    });
});
exports.default = connection;
