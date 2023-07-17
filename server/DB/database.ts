import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

let connection: mysql.Connection;
let environment = process.env.ENVIRONMENT

if (environment === "DEV") {
  const sqlPassword_Dev = process.env.SQLPASSWORD_DEV;
  const sqlUser_Dev = process.env.SQLUSER_DEV;
  const sqlDB_Name_Dev = process.env.DATABASE_DEV;
  const sqlHost_Dev = process.env.HOST_DEV;

  connection = mysql.createConnection({
    host: sqlHost_Dev,
    port: 3306,
    user: sqlUser_Dev,
    password: sqlPassword_Dev,
    database: sqlDB_Name_Dev,
    multipleStatements: true,
  });

  connection.connect((err) => {
    try {
      if (err) throw err;
      console.info("🔥 MySQL is connected 🛢 ");
    } catch (error) {
      console.error(error);
    }
  });

}
 else 
 {
  const sqlPassword_Prod = process.env.SQLPASSWORD_PROD;
  const sqlUser_Prod = process.env.SQLUSER_PROD;
  const sqlDB_Name_Prod = process.env.DATABASE_PROD;
  const sqlHost_Prod = process.env.HOST_PROD;

  // console.log(sqlPassword_Prod)
  // console.log(sqlUser_Prod)
  // console.log(sqlDB_Name_Prod)
  // console.log(sqlHost_Prod)

  connection = mysql.createConnection({
    host: sqlHost_Prod,
    port: 3306,
    user: sqlUser_Prod,
    password: sqlPassword_Prod,
    database: sqlDB_Name_Prod,
    //multipleStatements: true,
  });

  connection.connect((err) => {
    if (err) {
      console.trace(err);
      return;
    }

    console.info("🔥 MySQL is connected 🛢"); 
    connection.on("error", (err: { fatal: any; message: string }) => {
      if (err.fatal) {
        console.trace("Fatal error: " + err.message);
      }      
    });
  });
}

export default connection;
