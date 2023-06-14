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
exports.createRoom = exports.createHotel = exports.getRooms = void 0;
const database_1 = __importDefault(require("../../DB/database"));
const getRooms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { min, max, limit } = req.query;
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
//   title VARCHAR(255) NOT NULL,
//     price DECIMAL(10, 2) NOT NULL,
//   maxPeople INT NOT NULL,
//   description VARCHAR(1000) NOT NULL,
//   hotelID   INT NOT NULL  // potom dobavila
// export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const hotelID = req.params.hotelId;
//     const { title, price, maxPeople, description, roomNumbers } = req.body;
//     const roomQuery = `
//       INSERT INTO \`hotel-booking\`.\`rooms\` (hotelID, title, price, maxPeople, description)
//       VALUES (${hotelID}, "${title}", ${price}, ${maxPeople}, "${description}");
//     `;
//     connection.query(roomQuery, (error, roomResults: any) => {
//       if (error) {
//         return res.status(500).send({
//           success: false,
//           error: "Failed to insert room data into the database.",
//         });
//       }
//       const roomId = roomResults.insertId;
//       const roomNumbersQuery = `
//         INSERT INTO \`hotel-booking\`.\`room_numbers\` (roomId, number, unavailable_dates)
//         VALUES
//       `;
//       const roomNumbersValues = roomNumbers.map((roomNumber: any) => `(${roomId}, ${roomNumber.number}, '${JSON.stringify(roomNumber.unavailableDates)}')`).join(", ");
//       connection.query(roomNumbersQuery + roomNumbersValues, (error, roomNumbersResults) => {
//         if (error) {
//           return res.status(500).send({
//             success: false,
//             error: "Failed to insert room numbers data into the database.",
//           });
//         }
//         // Обновление отеля (добавление идентификатора комнаты в массив 'rooms')
//         connection.query(
//           'UPDATE hotels SET rooms = JSON_ARRAY_APPEND(rooms, "$", ?) WHERE hotelID = ?',
//           [roomId, hotelID],
//           (error) => {
//             if (error) {
//               return res.status(500).send({
//                 success: false,
//                 error: "Failed to update hotel data in the database.",
//               });
//             }
//             res.status(200).json({ success: true, message: "Room successfully created and linked to the hotel." });
//           }
//         );
//       });
//     });
//   } catch (error: any) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// }
const createRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotelID = req.params.hotelID;
        const { title, price, maxPeople, description, roomNumbers } = req.body;
        const roomQuery = `
      INSERT INTO \`hotel-booking\`.\`rooms\` (hotelID, title, price, maxPeople, description)
      VALUES (?, ?, ?, ?, ?);
    `;
        const roomValues = [hotelID, title, price, maxPeople, description];
        console.log(roomQuery);
        console.log(roomValues);
        database_1.default.query(roomQuery, roomValues, (error, roomResults) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    error: "Failed to insert room data into the database.",
                });
            }
            const roomId = roomResults.insertId;
            const roomNumbersQuery = `
        INSERT INTO \`hotel-booking\`.\`room_numbers\` (roomId, number, unavailable_dates)
        VALUES
      `;
            const roomNumbersArray = roomNumbers.split(",").map((number) => number.trim());
            const roomNumbersValues = roomNumbersArray.map((number) => [roomId, parseInt(number), null]);
            database_1.default.query(roomNumbersQuery, [roomNumbersValues], (error, roomNumbersResults) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        error: "Failed to insert room numbers data into the database.",
                    });
                }
                res.status(200).json({ success: true, message: "Room successfully created and linked to the hotel." });
            });
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});
exports.createRoom = createRoom;
