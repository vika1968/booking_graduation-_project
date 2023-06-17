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
exports.getHotelRooms = exports.countByType = exports.countByCity = exports.getHotels = exports.getHotelByName = exports.getHotel = exports.deleteHotel = exports.updateHotel = exports.createHotel = void 0;
const database_1 = __importDefault(require("../../DB/database"));
function createHotel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const name = req.body.newHotel.name;
            const type = req.body.newHotel.type;
            const city = req.body.newHotel.city;
            const address = req.body.newHotel.address;
            const distance = req.body.newHotel.distance;
            const title = req.body.newHotel.title;
            const description = req.body.newHotel.description;
            const rating = 0;
            const cheapestPrice = req.body.newHotel.cheapestPrice;
            const featured = req.body.newHotel.featured;
            let newFeatured = 0;
            const rooms = req.body.newHotel.rooms;
            const photos = req.body.newHotel.photos;
            if (featured === false) {
                newFeatured = 0;
            }
            else if (featured === true) {
                newFeatured = 1;
            }
            const hotelsQuery = `
      INSERT INTO \`hotel-booking\`.\`hotels\` (name, type, city, address, distance, title, description, rating, cheapestPrice, featured)
      VALUES ("${name}", "${type}", "${req.body.newHotel.city}", "${req.body.newHotel.address}", "${req.body.newHotel.distance}", "${req.body.newHotel.title}", "${req.body.newHotel.description}", "0", "${req.body.newHotel.cheapestPrice}", ${newFeatured});
    `;
            database_1.default.query(hotelsQuery, (error, hotelsResults) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        error: "Failed to insert hotel data into the database.",
                    });
                }
                const hotelId = hotelsResults.insertId;
                const photosQuery = `
        INSERT INTO \`hotel-booking\`.\`hotel_photos\` (hotelID, photo)
        VALUES
      `;
                const photoValues = photos.map((photo) => `(${hotelId}, "${photo}")`).join(", ");
                // console.log(photosQuery + photoValues)
                database_1.default.query(photosQuery + photoValues, (error, photosResults) => {
                    if (error) {
                        return res.status(500).send({
                            success: false,
                            error: "Failed to insert hotel photos data into the database.",
                        });
                    }
                    const roomsQuery = `
          INSERT INTO \`hotel-booking\`.\`room_types\` (hotelID, roomType)
          VALUES
        `;
                    const roomValues = rooms.map((room) => `(${hotelId}, "${room}")`).join(", ");
                    database_1.default.query(roomsQuery + roomValues, (error, roomsResults) => {
                        if (error) {
                            return res.status(500).send({
                                success: false,
                                error: "Failed to insert hotel room types data into the database.",
                            });
                        }
                        res.send({ success: true });
                    });
                });
            });
        }
        catch (error) {
            res.status(500).send({ success: false, error: error.message });
        }
    });
}
exports.createHotel = createHotel;
const updateHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('updateHotel');
        const { id } = req.params;
        console.log(id);
        // const { name, type, city, address, distance, title, description, rating, cheapestPrice, featured } = req.body;
        // const query = `
        //   UPDATE \`hotel-booking\`.hotels
        //   SET name = ?, type = ?, city = ?, address = ?, distance = ?, title = ?, description = ?, rating = ?, cheapestPrice = ?, featured = ?
        //   WHERE hotelID = ?
        // `;
        // const values = [name, type, city, address, distance, title, description, rating, cheapestPrice, featured, id];
        const { name, type, title, city } = req.body;
        console.log(name);
        const query = `
        UPDATE \`hotel-booking\`.hotels
        SET name = "${name}", type = "${type}", title = "${title}", city = "${city}"
        WHERE hotelID =${id}
      `;
        //  const values = [name, type, title, city, id];
        console.log(query);
        database_1.default.query(query, (err, result) => {
            if (err) {
                next(err);
            }
            else {
                if (result.affectedRows > 0) {
                    res.status(200).json({ success: true, message: 'Hotel has been updated.' });
                }
                else {
                    res.status(404).json({ success: false, error: 'Hotel not found' });
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
        const query = `DELETE FROM \`hotel-booking\`.hotels WHERE hotelID = '${id}'`;
        console.log(query);
        database_1.default.query(query, (err, result) => {
            if (err) {
                next(err);
            }
            else {
                if (result.affectedRows > 0) {
                    console.log(result);
                    res.status(200).json({ message: 'Hotel has been deleted.' });
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
        const query = 'SELECT * FROM \`hotel-booking\`.hotels WHERE hotelID = ?';
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
const getHotelByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('getHotelByName');
        const { name } = req.params;
        const query = 'SELECT * FROM \`hotel-booking\`.hotels WHERE name = ?';
        const values = [name];
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
exports.getHotelByName = getHotelByName;
const getHotels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { min, max, limit } = req.query;
        const query = `
    SELECT * FROM  \`hotel-booking\`.hotels
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
      FROM \`hotel-booking\`.hotels
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
      FROM \`hotel-booking\`.hotels
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
        const query = 'SELECT * FROM \`hotel-booking\`.rooms WHERE hotelID = ?';
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
