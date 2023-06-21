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
exports.deleteRoom = exports.createRoom = exports.getRoomTypes = exports.getRooms = void 0;
const database_1 = __importDefault(require("../../DB/database"));
const getRooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { min, max, limit } = req.query;
        // console.log('min')
        // console.log(max)
        // console.log(limit)
        const query = `
    SELECT * FROM  \`hotel-booking\`.rooms
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
exports.getRooms = getRooms;
const getRoomTypes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `
    SELECT * FROM  \`hotel-booking\`.room_types
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
exports.getRoomTypes = getRoomTypes;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotelID = req.params.hotelID;
        const { title, price, maxPeople, description, roomNumbers, typeID } = req.body;
        // Проверка наличия записи в таблице rooms с указанными параметрами
        const checkRoomQuery = `
      SELECT * FROM \`hotel-booking\`.\`rooms\` WHERE hotelID = ? AND title = ? AND price = ? AND maxPeople = ? AND description = ? AND typeID = ?;
    `;
        const checkRoomValues = [hotelID, title, price, maxPeople, description, typeID];
        database_1.default.query(checkRoomQuery, checkRoomValues, (error, checkRoomResults) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    error: "Failed to check room data in the database.",
                });
            }
            if (checkRoomResults.length > 0) {
                // Запись с указанными параметрами уже существует, отправляем ошибку
                return res.status(500).send({
                    success: false,
                    error: "Room data already exists in the database for the specified hotel.",
                });
            }
            // Вставка данных в таблицу rooms
            const roomQuery = `
        INSERT INTO \`hotel-booking\`.\`rooms\` (hotelID, title, price, maxPeople, description, typeID)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
            const roomValues = [hotelID, title, price, maxPeople, description, typeID];
            database_1.default.query(roomQuery, roomValues, (error, roomResults) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        error: "Failed to insert room data into the database.",
                    });
                }
                const roomId = roomResults.insertId;
                const roomNumbersQuery = `
          INSERT INTO \`hotel-booking\`.\`room_numbers\` (roomId, number)
          VALUES
        `;
                const roomNumbersValues = roomNumbers.map((room) => `(${roomId}, ${room.number})`).join(", ");
                console.log(roomNumbers);
                database_1.default.query(roomNumbersQuery + roomNumbersValues, (error, roomNumbersResults) => {
                    if (error) {
                        return res.status(500).send({
                            success: false,
                            error: "Failed to insert room numbers data into the database.",
                        });
                    }
                    res.status(200).json({ success: true, message: "Room successfully created and linked to the hotel." });
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
        console.log('Delete room');
        const { id } = req.params;
        const query = `DELETE FROM \`hotel-booking\`.rooms WHERE roomID = '${id}'`;
        database_1.default.query(query, (err, result) => {
            if (err) {
                res.status(404).json({ error: 'Room  has not  been delete' });
            }
            else {
                if (result.affectedRows > 0) {
                    console.log(result);
                    res.status(200).json({ message: 'Room has been deleted.' });
                }
                else {
                    res.status(404).json({ error: 'Room not found' });
                }
            }
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});
exports.deleteRoom = deleteRoom;
