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
exports.getBookingById = exports.newBookingBatch = exports.newBooking = void 0;
const database_1 = __importDefault(require("../../DB/database"));
//---Add single record with preventing duplicates
const newBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { movie, date, seatNumber, user } = req.body;
        const query = `INSERT INTO \`movie-booking\`.\`booking\` (movieID, date, seatNumber, userID)
        SELECT ${movie}, '${date}', ${seatNumber}, ${user}
        FROM dual
        WHERE NOT EXISTS (SELECT movieID FROM \`movie-booking\`.\`booking\` WHERE movieID = ${movie} AND date = '${date}' AND seatNumber = ${seatNumber} AND userID = ${user});`;
        database_1.default.query(query, (error, results, fields) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    error: "This booking already exists",
                });
            }
            if (results.affectedRows > 0) {
                res.send({ success: "Your booking has been successfully added.", message: results });
            }
            else {
                res.send({ success: "Such booking already exists.", message: results });
            }
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error });
    }
});
exports.newBooking = newBooking;
//---Add  records with preventing duplicates
const newBookingBatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = req.body.orders;
        const values = orders
            .map(({ movieID, date, seatNumber, userID }) => `SELECT ${movieID}, '${date}', ${seatNumber}, ${userID}`)
            .join(' UNION ALL ');
        const sql = `
      INSERT INTO \`movie-booking\`.\`booking\` (movieID, date, seatNumber, userID)
      WITH newBookings (movieID, date, seatNumber, userID) AS (
        SELECT * FROM (${values}) AS derived
      )
      SELECT movieID, date, seatNumber, userID FROM newBookings
      WHERE NOT EXISTS (
        SELECT 1 FROM \`movie-booking\`.\`booking\`
        WHERE movieID = newBookings.movieID
        AND date = newBookings.date
        AND seatNumber = newBookings.seatNumber
        AND userID = newBookings.userID
      )
    `;
        database_1.default.query(sql, (error, results) => {
            if (error) {
                res.status(500).send('Error inserting data into the database.');
            }
            else {
                res.send('Data successfully inserted into the database.');
            }
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error });
    }
});
exports.newBookingBatch = newBookingBatch;
const getBookingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let booking;
    try {
        const [rows, fields] = yield database_1.default.execute(`SELECT * FROM \`movie-booking\`.\`booking\` WHERE bookingID=${id}`);
        booking = rows[0];
    }
    catch (error) {
        return console.log(error);
    }
    if (!booking) {
        return res.status(500).json({ message: 'Unexpected Error' });
    }
    return res.status(200).json({ booking });
});
exports.getBookingById = getBookingById;
