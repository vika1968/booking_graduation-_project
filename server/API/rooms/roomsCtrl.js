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
exports.updateRoomAvailability = exports.deleteRoom = exports.createRoom = exports.getRoomTypes = exports.getRooms = void 0;
const database_1 = __importDefault(require("../../DB/database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let environment = process.env.ENVIRONMENT;
let DB;
if (environment === "DEV") {
    DB = process.env.DATABASE_DEV;
}
else {
    DB = process.env.DATABASE_PROD;
}
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { min, max, limit } = req.query;
        const query = `SELECT * FROM \`${DB}\`.rooms`;
        const values = [min, max, limit];
        database_1.default.query(query, values, (err, result) => {
            if (err) {
                res
                    .status(500)
                    .send({ success: false, error: "Error retrieving hotels." });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ error: "No hotels found." });
            }
            else {
                res.status(200).json(result);
            }
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});
exports.getRooms = getRooms;
const getRoomTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
    SELECT * FROM \`${DB}\`.room_types`;
        database_1.default.query(query, (err, result) => {
            if (err) {
                res
                    .status(500)
                    .send({ success: false, error: "Error retrieving room types." });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ error: "No room types found." });
            }
            else {
                res.status(200).json(result);
            }
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});
exports.getRoomTypes = getRoomTypes;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotelID = req.params.hotelID;
        const { title, price, maxPeople, description, roomNumbers, typeID } = req.body;
        const checkRoomQuery = `
      SELECT * FROM \`${DB}\`.\`rooms\` WHERE hotelID = ? AND title = ? AND price = ? AND maxPeople = ? AND description = ? AND typeID = ?;
    `;
        const checkRoomValues = [
            hotelID,
            title,
            price,
            maxPeople,
            description,
            typeID,
        ];
        database_1.default.query(checkRoomQuery, checkRoomValues, (error, checkRoomResults) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    error: "Failed to check room data in the database.",
                });
            }
            if (checkRoomResults.length > 0) {
                return res.status(500).send({
                    success: false,
                    error: "Room data already exists in the database for the specified hotel.",
                });
            }
            const roomQuery = `
        INSERT INTO \`${DB}\`.\`rooms\` (hotelID, title, price, maxPeople, description, typeID)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
            const roomValues = [
                hotelID,
                title,
                price,
                maxPeople,
                description,
                typeID,
            ];
            database_1.default.query(roomQuery, roomValues, (error, roomResults) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        error: "Failed to insert room data into the database.",
                    });
                }
                const roomId = roomResults.insertId;
                const roomNumbersQuery = `
          INSERT INTO \`${DB}\`.\`room_numbers\` (roomId, number)
          VALUES
        `;
                const roomNumbersValues = roomNumbers
                    .map((room) => `(${roomId}, ${room.number})`)
                    .join(", ");
                database_1.default.query(roomNumbersQuery + roomNumbersValues, (error, roomNumbersResults) => {
                    if (error) {
                        return res.status(500).send({
                            success: false,
                            error: "Failed to insert room numbers data into the database.",
                        });
                    }
                    res.status(200).json({
                        success: true,
                        message: "Room successfully created and linked to the hotel.",
                    });
                });
            });
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});
exports.createRoom = createRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = `DELETE FROM \`${DB}\`.rooms WHERE roomID = '${id}'`;
        database_1.default.query(query, (err, result) => {
            if (err) {
                res.status(404).json({ error: "Room has not been deleted." });
            }
            else {
                if (result.affectedRows > 0) {
                    res.status(200).json({ message: "Room has been deleted." });
                }
                else {
                    res.status(404).json({ error: "Room not found" });
                }
            }
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});
exports.deleteRoom = deleteRoom;
const updateRoomAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomNumber } = req.params;
        const { user, dates, hotelId } = req.body;
        const selectQuery = `SELECT rm.ID FROM \`${DB}\`.\`rooms\` AS r INNER JOIN \`${DB}\`.\`hotels\` AS h ON r.HotelID = h.HotelID INNER JOIN \`${DB}\`.\`room_numbers\` AS rm ON r.roomId = rm.roomId WHERE h.hotelId = ? AND rm.number = ?`;
        const selectValues = [hotelId, roomNumber];
        database_1.default.query(selectQuery, selectValues, (selectError, rows) => {
            if (selectError) {
                res
                    .status(500)
                    .json({ error: "Failed to update room availability." });
            }
            else if (rows.length === 0) {
                res.status(404).json({ error: "Room not found." });
            }
            else {
                const hotelRoomId = rows[0].ID;
                const checkQuery = `
        SELECT ID
        FROM  \`${DB}\`.\`room_unavailable_dates\`
        WHERE hotelRoomId = ?
        AND (
          (unavailableDateStart < DATE(DATE_ADD(?, INTERVAL 1 DAY)) AND unavailableDateEnd > DATE(DATE_ADD(?, INTERVAL 1 DAY)))
          OR
          (unavailableDateStart < DATE(DATE_ADD(?, INTERVAL 1 DAY)) AND unavailableDateEnd > DATE(DATE_ADD(?, INTERVAL 1 DAY)))
        )
        LIMIT 1;
        `;
                const checkValues = [
                    hotelRoomId,
                    dates[1],
                    dates[0],
                    dates[0],
                    dates[1], //unavailableDateEnd
                ];
                database_1.default.query(checkQuery, checkValues, (checkError, checkResult) => {
                    if (checkError) {
                        res
                            .status(500)
                            .json({ error: "Failed to update room availability." });
                    }
                    else if (checkResult.length > 0) {
                        res.status(400).json({
                            error: `Room ${roomNumber} is already unavailable for the selected dates.`,
                        });
                    }
                    else {
                        const insertQuery = `
              INSERT INTO \`${DB}\`.\`room_unavailable_dates\` (hotelRoomId, userID, unavailableDateStart, unavailableDateEnd)
              VALUES (?, ?, ?, ?);
            `;
                        const insertValues = [
                            hotelRoomId,
                            user,
                            new Date(dates[0]),
                            new Date(dates[1]),
                        ];
                        database_1.default.query(insertQuery, insertValues, (insertError, result) => {
                            if (insertError) {
                                res
                                    .status(500)
                                    .json({ error: "Failed to update room availability." });
                            }
                            else {
                                res.status(200).json("Room status has been updated.");
                            }
                        });
                    }
                });
            }
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});
exports.updateRoomAvailability = updateRoomAvailability;
