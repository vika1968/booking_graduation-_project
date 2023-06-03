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
exports.getHotelRooms = exports.countByType = exports.countByCity = exports.getHotels = exports.getHotel = exports.deleteHotel = exports.updateHotel = exports.createHotel = void 0;
const database_1 = __importDefault(require("../../DB/database"));
const createHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, type, city, address, distance, title, description, rating, cheapestPrice, featured } = req.body;
        const query = `
      INSERT INTO hotels (name, type, city, address, distance, title, description, rating, cheapestPrice, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const values = [name, type, city, address, distance, title, description, rating, cheapestPrice, featured];
        database_1.default.query(query, values, (err, result) => {
            if (err) {
                next(err);
            }
            else {
                const hotelId = result.insertId;
                res.status(200).json(Object.assign({ hotelId }, req.body));
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createHotel = createHotel;
const updateHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, type, city, address, distance, title, description, rating, cheapestPrice, featured } = req.body;
        const query = `
        UPDATE hotels
        SET name = ?, type = ?, city = ?, address = ?, distance = ?, title = ?, description = ?, rating = ?, cheapestPrice = ?, featured = ?
        WHERE hotelID = ?
      `;
        const values = [name, type, city, address, distance, title, description, rating, cheapestPrice, featured, id];
        database_1.default.query(query, values, (err, result) => {
            if (err) {
                next(err);
            }
            else {
                if (result.affectedRows > 0) {
                    res.status(200).json(Object.assign({ hotelId: id }, req.body));
                }
                else {
                    res.status(404).json({ error: 'Hotel not found' });
                }
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateHotel = updateHotel;
const deleteHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM hotels WHERE hotelID = ?';
        const values = [id];
        database_1.default.query(query, values, (err, result) => {
            if (err) {
                next(err);
            }
            else {
                if (result.affectedRows > 0) {
                    res.status(200).json('Hotel has been deleted.');
                }
                else {
                    res.status(404).json({ error: 'Hotel not found' });
                }
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteHotel = deleteHotel;
const getHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM hotels WHERE hotelID = ?';
        const values = [id];
        database_1.default.query(query, values, (err, result) => {
            if (err) {
                next(err);
            }
            else {
                if (result.length > 0) {
                    res.status(200).json(result[0]);
                }
                else {
                    res.status(404).json({ error: 'Hotel not found' });
                }
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getHotel = getHotel;
const getHotels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { min, max, limit } = req.query;
        const query = `
      SELECT *
      FROM hotels
      WHERE cheapestPrice > IFNULL(?, 1) AND cheapestPrice < IFNULL(?, 999)
      LIMIT ?
    `;
        const values = [min, max, limit];
        database_1.default.query(query, values, (err, result) => {
            if (err) {
                next(err);
            }
            else {
                res.status(200).json(result);
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getHotels = getHotels;
const countByCity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cities } = req.query;
        const cityList = cities.split(',');
        const placeholders = cityList.map(() => '?').join(', ');
        const query = `
      SELECT city, COUNT(*) AS count
      FROM hotels
      WHERE city IN (${placeholders})
      GROUP BY city
    `;
        const values = cityList;
        database_1.default.query(query, values, (err, result) => {
            if (err) {
                next(err);
            }
            else {
                res.status(200).json(result);
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.countByCity = countByCity;
const countByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
      SELECT type, COUNT(*) AS count
      FROM hotels
      GROUP BY type
    `;
        database_1.default.query(query, (err, result) => {
            if (err) {
                next(err);
            }
            else {
                res.status(200).json(result);
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.countByType = countByType;
const getHotelRooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM rooms WHERE hotelID = ?';
        const values = [id];
        database_1.default.query(query, values, (err, result) => {
            if (err) {
                next(err);
            }
            else {
                res.status(200).json(result);
            }
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getHotelRooms = getHotelRooms;
