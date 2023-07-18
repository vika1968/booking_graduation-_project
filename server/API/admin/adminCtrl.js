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
exports.login = exports.register = exports.getAdmin = void 0;
const database_1 = __importDefault(require("../../DB/database"));
const adminValidator_1 = require("./adminValidator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const saltRounds = 10;
let environment = process.env.ENVIRONMENT;
let DB;
if (environment === "DEV") {
    DB = process.env.DATABASE_DEV;
}
else {
    DB = process.env.DATABASE_PROD;
}
function getAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adminId = req.params.sesStor;
            const secret = process.env.JWT_SECRET;
            if (!secret)
                throw new Error("Couldn't load secret code from .env file.");
            if (!adminId)
                throw new Error("No authorized admin !!!!!!!");
            const decodedAdminId = jwt_simple_1.default.decode(adminId, secret);
            const query = `SELECT * FROM \`${DB}\`.\`users\` WHERE isAdmin = 1 AND userID = '${decodedAdminId.adminID}'`;
            database_1.default.query(query, [decodedAdminId], (error, results) => {
                if (error) {
                    res.status(500).send({ error: "Error executing SQL query." });
                }
                else {
                    res.send({ sucess: true, adminData: results });
                }
            });
        }
        catch (error) {
            res.status(500).send({ sucess: false, error: error.message });
        }
    });
}
exports.getAdmin = getAdmin;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password, country, city, phone } = req.body;
            if (!username)
                return res.status(500).send({ success: false, error: "No admin name available." });
            if (!email)
                return res.status(500).send({ success: false, error: "No email available." });
            if (!password)
                return res.status(500).send({ success: false, error: "No password available." });
            if (!country)
                return res.status(500).send({ success: false, error: "No country available." });
            if (!city)
                return res.status(500).send({ success: false, error: "No city available." });
            if (!phone)
                return res.status(500).send({ success: phone, error: "No city available." });
            const { error } = adminValidator_1.AdminValidation.validate({ email, password });
            if (error) {
                return res.status(500).send({ success: false, error: error.message });
            }
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            const hash = bcrypt_1.default.hashSync(password, salt);
            const query = `INSERT INTO \`${DB}\`.\`users\` (username, email, password, country, city, phone, isAdmin) VALUES ("${username}", "${email}", "${hash}", "${country}", "${city}", "${phone}", true);`;
            database_1.default.query(query, (error, results, fields) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        error: "Failed to insert admin data into database. Check your details. Perhaps you are trying to enter already registered data.",
                    });
                }
                const secret = process.env.JWT_SECRET;
                if (!secret)
                    return res.status(500).send({ success: false, error: "Couldn't load secret code from .env file." });
                const insertId = results.insertId;
                const activeAdmin = { adminID: insertId };
                const JWTEncryptedAdmin = jwt_simple_1.default.encode(activeAdmin, secret);
                res.send({ success: true, adminArray: results, encryptedAdmin: JWTEncryptedAdmin });
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
            const query = `SELECT * FROM \`${DB}\`.\`users\` WHERE isAdmin = 1 AND email='${email}'`;
            database_1.default.query(query, (err, results, fields) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (err)
                        throw err;
                    if (!Array.isArray(results) || results.length === 0) {
                        throw new Error("Email doesn't match or admin doesn't exists.");
                    }
                    const isMatch = yield bcrypt_1.default.compare(password, results[0].password);
                    if (!isMatch) {
                        throw new Error("Password doesn't match or admin doesn't exists.");
                    }
                    const activeAdmin = { adminID: results[0].userID };
                    const secret = process.env.JWT_SECRET;
                    if (!secret)
                        throw new Error("Couldn't load secret key from .env file.");
                    const JWTEncryptedAdmin = jwt_simple_1.default.encode(activeAdmin, secret);
                    res.send({ success: true, adminArray: results[0], encryptedAdmin: JWTEncryptedAdmin });
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
