import express from "express";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import { UserValidation } from "./userValidator";
import connection from "../../DB/database";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

const saltRounds = 10;

export async function getUser(req: express.Request, res: express.Response) {
    try {
        const secret: any = process.env.JWT_SECRET;

        if (!secret) throw new Error("Couldn't load secret code from .env file.");
        const { userId } = req.cookies;
        if (!userId) throw new Error("No authorized user !!!!!!!");

        const decodedUserId = jwt.decode(userId, secret);
        const query = `SELECT * FROM \`hotel-booking\`.\`users\` WHERE isAdmin = 0 AND userID = '${decodedUserId.userID}'`;
      
        connection.query(query, [decodedUserId], (error, results) => {
            if (error) {
                res.status(500).send({ error: "Error executing SQL query." });
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
            return res.status(500).send({ success: false, error: "No username available." });
        if (!email)          
            return res.status(500).send({ success: false, error: "No email available." });
        if (!password)        
            return res.status(500).send({ success: false, error: "No password available." });
        if (!country)         
            return res.status(500).send({ success: false, error: "No country available." });
        if (!city)         
            return res.status(500).send({ success: false, error: "No city available." });
        if (!phone)           
            return res.status(500).send({ success: false, error: "No city available." });

        const { error } = UserValidation.validate({ email, password });
        if (error) {          
            return res.status(500).send({ success: false, error: error.message });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const query = `INSERT INTO \`hotel-booking\`.\`users\` (username, email, password, country, city, phone, isAdmin) VALUES ("${username}", "${email}", "${hash}", "${country}", "${city}", "${phone}", false);`;

         connection.query(query, (error, results: any) => {
            if (error) {              
                return res.status(500).send({
                    success: false,
                    error: "Failed to insert user data into database. Check your details. Perhaps you are trying to enter already registered data.",
                });
            }

            const secret = process.env.JWT_SECRET;
            if (!secret)
                return res.status(500).send({ success: false, error: "Couldn't load secret code from .env file." });

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
        const query = `SELECT * FROM \`hotel-booking\`.\`users\` WHERE isAdmin = 0 AND email='${email}'`;
        connection.query(query, async (err, results: RowDataPacket[]) => {
            try {
                if (err) throw err;
                if (!Array.isArray(results) || results.length === 0) {
                    throw new Error("Email doesn't match or user doesn't exists.");
                }
                const isMatch = await bcrypt.compare(password, results[0].password);
                if (!isMatch) {
                    throw new Error("Password doesn't match or user doesn't exists.");
                }
                const cookie = { userID: results[0].userID };
             
                const secret = process.env.JWT_SECRET;
                if (!secret) throw new Error("Couldn't load secret key from .env file.");

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

        connection.query(query, (error, results) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    error: "Failed to update user data.",
                });
            }

            const secret = process.env.JWT_SECRET;
            if (!secret)
                return res.status(500).send({ success: false, error: "Couldn't load secret code from .env file." });

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

        const query = `DELETE FROM \`hotel-booking\`.\`users\` WHERE userID = ?`;
        const value = [id];

       connection.query(query, value, (err, result: OkPacket) => {
      if (err) {
        res.status(404).json({ error: 'Something went wrong. Error deleting user from the database.' });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ message: 'User has been deleted.' });

        } else {
          res.status(404).json({ error: 'User not found.' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export async function getUserByID(req: express.Request, res: express.Response) {
    try {
        const id = req.params.id;
        const query = `SELECT * FROM \`hotel-booking\`.\`users\` WHERE isAdmin = 0 AND userID = ${id}`;

        connection.query(query, (err, result: ResultSetHeader) => {
            if (err) {
                return res.status(500).json({ error: "Something went wrong." });
            }
            if (result.affectedRows === 0) {
                return res.status(500).json({ error: "No user found with the specified ID." });
            }
            console.log(result)
            return res.status(200).json({ success: "The user has been dedicated.", user: result });

        });
    } catch (error: any) {
        res.status(500).send({ success: false, error: error.message });
    }
}

export async function getUsers(req: express.Request, res: express.Response) {
    try {          
        const query = `SELECT * FROM \`hotel-booking\`.\`users\` WHERE isAdmin = 0`;       
       
        connection.query(query, (error, results) => {
            if (error) {
                res.status(500).send({ error: "Error executing receive all users ( no admins )." });
            } else {             
               res.status(200).json(results);              
            }
        });
    } catch (error: any) {      
        res.status(500).send({ success: false, error: error.message });
    }
}

