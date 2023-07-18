"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUserByID = exports.deleteUser = exports.updateUser = exports.login = exports.register = exports.getUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const userValidator_1 = require("./userValidator");
const database_1 = __importDefault(require("../../DB/database"));
const saltRounds = 10;
//const DB =`sql7633384`
const DB = `\`hotel-booking\``;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret)
                throw new Error("Couldn't load secret code from .env file.");
            const { userId } = req.cookies;
            if (!userId)
                throw new Error("No authorized user !!!!!!!");
            const decodedUserId = jwt_simple_1.default.decode(userId, secret);
            const query = `SELECT * FROM '${DB}'.\`users\` WHERE isAdmin = 0 AND userID = '${decodedUserId.userID}'`;
            database_1.default.query(query, [decodedUserId], (error, results) => {
                if (error) {
                    res.status(500).send({ error: "Error executing SQL query." });
                }
                else {
                    res.send({ sucess: true, userData: results });
                }
            });
        }
        catch (error) {
            res.status(500).send({ sucess: false, error: error.message });
        }
    });
}
exports.getUser = getUser;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const { error } = userValidator_1.UserValidation.validate({ email, password });
            if (error) {
                return res.status(500).send({ success: false, error: error.message });
            }
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            const hash = bcrypt_1.default.hashSync(password, salt);
            const query = `INSERT INTO '${DB}'.\`users\` (username, email, password, country, city, phone, isAdmin) VALUES ("${username}", "${email}", "${hash}", "${country}", "${city}", "${phone}", false);`;
            database_1.default.query(query, (error, results) => {
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
                const JWTCookie = jwt_simple_1.default.encode(cookie, secret);
                res.cookie("userId", JWTCookie);
                res.send({ success: true, userArray: results });
            });
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { credentials } = req.body;
            const email = credentials.email;
            const password = credentials.password;
            if (!email || !password)
                throw new Error("no data from client login in login");
            const query = `SELECT * FROM '${DB}'.\`users\` WHERE isAdmin = 0 AND email='${email}'`;
            database_1.default.query(query, (err, results) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (err)
                        throw err;
                    if (!Array.isArray(results) || results.length === 0) {
                        throw new Error("Email doesn't match or user doesn't exists.");
                    }
                    const isMatch = yield bcrypt_1.default.compare(password, results[0].password);
                    if (!isMatch) {
                        throw new Error("Password doesn't match or user doesn't exists.");
                    }
                    const cookie = { userID: results[0].userID };
                    const secret = process.env.JWT_SECRET;
                    if (!secret)
                        throw new Error("Couldn't load secret key from .env file.");
                    const JWTCookie = jwt_simple_1.default.encode(cookie, secret);
                    res.cookie("userId", JWTCookie);
                    res.send({ success: true, userArray: results });
                }
                catch (error) {
                    res.status(500).send({ success: false, error: error.message });
                }
            }));
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.login = login;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, id } = req.body;
            if (!email || !password || !id) {
                throw new Error('No data received from the user.');
            }
            const { error } = userValidator_1.UserValidation.validate({ email, password });
            if (error) {
                return res.status(500).send({
                    success: false,
                    error: error.message,
                });
            }
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            const hash = bcrypt_1.default.hashSync(password, salt);
            const query = `UPDATE '${DB}'.\`users\` SET email ='${email}', password ='${hash}' WHERE userID ='${id}';`;
            database_1.default.query(query, (error, results) => {
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
                const JWTCookie = jwt_simple_1.default.encode(cookie, secret);
                res.cookie("userId", JWTCookie);
                res.send({ success: true, userArray: results });
            });
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ error: "Missing user ID." });
            }
            res.clearCookie('userId');
            const query = `DELETE FROM '${DB}'.\`users\` WHERE userID = ?`;
            const value = [id];
            database_1.default.query(query, value, (err, result) => {
                if (err) {
                    res.status(404).json({ error: 'Something went wrong. Error deleting user from the database.' });
                }
                else {
                    if (result.affectedRows > 0) {
                        res.status(200).json({ message: 'User has been deleted.' });
                    }
                    else {
                        res.status(404).json({ error: 'User not found.' });
                    }
                }
            });
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.deleteUser = deleteUser;
;
function getUserByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const query = `SELECT * FROM '${DB}'.\`users\` WHERE isAdmin = 0 AND userID = ${id}`;
            database_1.default.query(query, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: "Something went wrong." });
                }
                if (result.affectedRows === 0) {
                    return res.status(500).json({ error: "No user found with the specified ID." });
                }
                return res.status(200).json({ success: "The user has been dedicated.", user: result });
            });
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.getUserByID = getUserByID;
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM '${DB}'.\`users\` WHERE isAdmin = 0`;
            database_1.default.query(query, (error, results) => {
                if (error) {
                    res.status(500).send({ error: "Error executing receive all users ( no admins )." });
                }
                else {
                    res.status(200).json(results);
                }
            });
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.getUsers = getUsers;
