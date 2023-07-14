"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByUserID = void 0;
const database_1 = __importDefault(require("../../DB/database"));
const getOrdersByUserID = (req, res) => {
    const id = req.params.id;
    const query = `
    SELECT u.userID, u.username, u.email, u.country, u.city,  
         h.name AS hotelname, h.city AS hotelcity, rud.unavailableDateStart AS datestart, 
         rud.unavailableDateEnd AS dateend, rm.number AS roomnumber, r.Price AS price 
    FROM \`hotel-booking\`.\`rooms\` AS r 
    INNER JOIN \`hotel-booking\`.\`hotels\` AS h 
         ON r.HotelID = h.HotelID 
    INNER JOIN \`hotel-booking\`.\`room_numbers\`AS rm 
         ON r.roomId = rm.roomId
    INNER JOIN \`hotel-booking\`.\`room_unavailable_dates\` AS rud 
          ON rm.ID=rud.hotelRoomId
    INNER JOIN  \`hotel-booking\`.\`users\` AS u
          ON u.userID = rud.userID
    WHERE u.userID=${id};   
   `;
    database_1.default.query(query, (error, results) => {
        try {
            if (error) {
                return res
                    .status(500)
                    .json({ success: false, error: "Internal Server Error" });
            }
            const orders = results;
            return res.status(200).json({ orders });
        }
        catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    });
};
exports.getOrdersByUserID = getOrdersByUserID;
