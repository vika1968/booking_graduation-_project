

import mysql from "mysql2";

//require("dotenv").config();
//OR
import dotenv from "dotenv";
dotenv.config();

const sqlPassword = process.env.SQLPASSWORD; 
const sqlUser = process.env.SQLUSER; 
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: sqlUser,
  password: sqlPassword,
  database: "hotel-booking",
  multipleStatements: true 
});

connection.connect((err) => {
  try {
    if (err) throw err;

    console.info("🔥 MySQL is connected 🛢 ");
  } catch (error) {
    console.error(error);
  }
});

export default connection;
