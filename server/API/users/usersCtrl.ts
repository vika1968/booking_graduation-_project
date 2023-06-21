import express from "express";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import { UserValidation } from "./userValidator";
import connection from "../../DB/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const saltRounds = 10;

export async function getUser(req: express.Request, res: express.Response) {
    try {
        const secret: any = process.env.JWT_SECRET;

        if (!secret) throw new Error("Couldn't load secret code from .env");
        const { userId } = req.cookies;
        if (!userId) throw new Error("No authorized user !!!!!!!");

        const decodedUserId = jwt.decode(userId, secret);
        const query = `SELECT * FROM \`hotel-booking\`.\`users\` WHERE userID = '${decodedUserId.userID}'`;
      
        connection.query(query, [decodedUserId], (error, results) => {
            if (error) {
                res.status(500).send({ error: "Error executing SQL query" });
            } else {
                res.send({ sucess: true, userData: results });
            }
        });
    } catch (error: any) {
        res.status(500).send({ sucess: false, error: error.message });
    }
}

export async function register(req: express.Request, res: express.Response) {
    try {
        const { username, email, password, country, city, phone } = req.body;

        if (!username)
            // throw new Error("No username available from req.body");
            return res.status(500).send({ success: false, error: "No username available." });
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
            return res.status(500).send({ success: false, error: "No city available." });

        const { error } = UserValidation.validate({ email, password });
        if (error) {
            return res.status(500).send({ success: false, error: error.message });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const query = `INSERT INTO \`hotel-booking\`.\`users\` (username, email, password, country, city, phone, isAdmin) VALUES ("${username}", "${email}", "${hash}", "${country}", "${city}", "${phone}", false);`;

         connection.query(query, (error, results: any, fields) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    error: "Failed to insert user data into database. Check your details. Perhaps you are trying to enter already registered data.",
                });
            }

            const secret = process.env.JWT_SECRET;
            if (!secret)
                return res.status(500).send({ success: false, error: "Couldn't load secret code from .env" });

            const insertId = results.insertId;          

            const cookie = { userID: insertId };
            const JWTCookie = jwt.encode(cookie, secret);

            res.cookie("userId", JWTCookie);
            res.send({ success: true, userArray: results });
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
        const query = `SELECT * FROM \`hotel-booking\`.\`users\` WHERE email='${email}'`;
        connection.query(query, async (err, results: RowDataPacket[], fields) => {
            try {
                if (err) throw err;
                if (!Array.isArray(results) || results.length === 0) {
                    throw new Error("Email or password doesn't match or user doesn't exists.");
                }
                const isMatch = await bcrypt.compare(password, results[0].password);

                const cookie = { userID: results[0].userID };
             
                const secret = process.env.JWT_SECRET;
                if (!secret) throw new Error("Couldn't load secret key from .env file");

                const JWTCookie = jwt.encode(cookie, secret);

                res.cookie("userId", JWTCookie);
                res.send({ success: true, userArray: results });
            } catch (error: any) {
                res.status(500).send({ success: false, error: error.message });
            }
        });
    } catch (error: any) {
        res.status(500).send({ success: false, error: error.message });
    }
}


export async function updateUser(req: express.Request, res: express.Response) {
    try {
        const { email, password, id } = req.body;
        if (!email || !password || !id) {
            throw new Error('No data received from the user.');
        }
        const { error } = UserValidation.validate({ email, password });
        if (error) {
            return res.status(500).send({
                success: false,
                error: error.message,
            });
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const query = `UPDATE \`hotel-booking\`.\`users\` SET email ='${email}', password ='${hash}' WHERE userID ='${id}';`;

        connection.query(query, (error, results, fields) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    error: "Failed to update user data",
                });
            }

            const secret = process.env.JWT_SECRET;
            if (!secret)
                return res.status(500).send({ success: false, error: "Couldn't load secret code from .env" });

            const cookie = { userID: id };
            const JWTCookie = jwt.encode(cookie, secret);

            res.cookie("userId", JWTCookie);
            res.send({ success: true, userArray: results });
        });
    } catch (error: any) {
        res.status(500).send({ success: false, error: error.message });
    }
}


export async function deleteUser(req: express.Request, res: express.Response) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "Missing user ID." });
        }

        res.clearCookie('userId');

        const query = `DELETE FROM \`hotel-booking\`.\`users\` WHERE userID = ${id}`;
        connection.query(query, (err, result: ResultSetHeader) => {
            if (err) {
                return res.status(500).json({ error: "Something went wrong. Error deleting user from the database." });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "No user found with the specified ID." });
            }

            return res.status(200).json({ error: "The user has been deleted." });
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export async function getUserByID(req: express.Request, res: express.Response) {
    try {
        const id = req.params.id;
        const query = `SELECT * FROM  \`hotel-booking\`.\`users\` WHERE userID = ${id}`;

        connection.query(query, (err, result: ResultSetHeader) => {
            if (err) {
                return res.status(500).json({ error: "Something went wrong." });
            }
            if (result.affectedRows === 0) {
                return res.status(500).json({ error: "No user found with the specified ID." });
            }

            return res.status(200).json({ success: "The user has been dedicated.", user: result });

        });
    } catch (error: any) {
        res.status(500).send({ success: false, error: error.message });
    }
}

export async function getUsers(req: express.Request, res: express.Response) {
    try {          
        const query = `SELECT * FROM \`hotel-booking\`.\`users\` WHERE isAdmin = 0`;       
        console.log(query)
        connection.query(query, (error, results) => {
            if (error) {
                res.status(500).send({ error: "Error executing receive all users ( no admins)" });
            } else {             
               res.status(200).json(results);              
            }
        });
    } catch (error: any) {      
        res.status(500).send({ success: false, error: error.message });
    }
}

