import express from "express";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";

import connection from "../../DB/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { AdminValidation } from "./adminValidator";

const saltRounds = 10;

export async function getAdmin(req: express.Request, res: express.Response) {
    try {
        const secret: any = process.env.JWT_SECRET;
        if (!secret) throw new Error("Couldn't load secret code from .env");

        const { adminId } = req.cookies;
        if (!adminId) throw new Error("No authorized admin !!!!!!!");

        const decodedAdminId = jwt.decode(adminId, secret);

        const query = `SELECT * FROM \`hotel-booking\`.\`users\` WHERE isAdmin = 1 AND  userID = '${decodedAdminId.adminID}'`;

        connection.query(query, [decodedAdminId], (error, results) => {
            if (error) {
                res.status(500).send({ error: "Error executing SQL query" });
            } else {
                res.send({ sucess: true, adminData: results });
            }
        });
    } catch (error: any) {
        res.status(500).send({ sucess: false, error: error.message });
    }
}

export async function register(req: express.Request, res: express.Response) {
    try {
        const { username, email, password, country, city, phone } = req.body;

        //    if (!username || !email || !password || !country|| !city || !phone)
        //       throw new Error("Not all fields are available from req.body");   
        if (!username)
            // throw new Error("No username available from req.body");
            return res.status(500).send({ success: false, error: "No admin name available." });
        if (!email)
            //  throw new Error("No email available from req.body");
            return res.status(500).send({ success: false, error: "No email available." });
        if (!password)
            //  throw new Error("No password available from req.body");
            return res.status(500).send({ success: false, error: "No password available." });
        if (!country)
            //  throw new Error("No country available from req.body");
            return res.status(500).send({ success: false, error: "No country available." });
        if (!city)
            //  throw new Error("No city available from req.body");
            return res.status(500).send({ success: false, error: "No city available." });
        if (!phone)
            //  throw new Error("No phone available from req.body");
            return res.status(500).send({ success: phone, error: "No city available." });

        const { error } = AdminValidation.validate({ email, password });
        if (error) {
            return res.status(500).send({ success: false, error: error.message });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
       
        const query = `INSERT INTO \`hotel-booking\`.\`users\` (username, email, password, country, city, phone, isAdmin) VALUES ("${username}", "${email}", "${hash}", "${country}", "${city}", "${phone}", true);`;
    
        connection.query(query, (error, results: any, fields) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    error: "Failed to insert admin data into database. Check your details. Perhaps you are trying to enter already registered data.",
                });
            }

            const secret = process.env.JWT_SECRET;
            if (!secret)
                return res.status(500).send({ success: false, error: "Couldn't load secret code from .env" });

            const insertId = results.insertId;          

            const cookie = { adminID: insertId };
            const JWTCookie = jwt.encode(cookie, secret);

            res.cookie("adminId", JWTCookie);
            res.send({ success: true, adminArray: results });
        });

    } catch (error: any) {
        res.status(500).send({ success: false, error: error.message });
    }
}


export async function login(req: express.Request, res: express.Response) {
    try {
        const { credentials } = req.body;
        const email = credentials.email;
        const password = credentials.password;

        if (!email || !password)
            throw new Error("no data from client login in login");
        const query = `SELECT * FROM \`hotel-booking\`.\`users\` WHERE isAdmin = 1 AND email='${email}'`;
        connection.query(query, async (err, results: RowDataPacket[], fields) => {
            try {
                if (err) throw err;
                if (!Array.isArray(results) || results.length === 0) {
                    throw new Error("Email doesn't match or admin doesn't exists.");
                }
                const isMatch = await bcrypt.compare(password, results[0].password);
                if (!isMatch) {
                    throw new Error("Password doesn't match or admin doesn't exists.");
                }
                const cookie = { adminID: results[0].userID };
              
                const secret = process.env.JWT_SECRET;
                if (!secret) throw new Error("Couldn't load secret key from .env file");

                const JWTCookie = jwt.encode(cookie, secret);

                res.cookie("adminId", JWTCookie);
                res.send({ success: true, adminArray: results });
            } catch (error: any) {
                res.status(500).send({ success: false, error: error.message });
            }
        });
    } catch (error: any) {
        res.status(500).send({ success: false, error: error.message });
    }
}




