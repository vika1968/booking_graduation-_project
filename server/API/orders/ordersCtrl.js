"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByUserID = void 0;
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
const getOrdersByUserID = (req, res) => {
    const id = req.params.id;
    const query = `
    SELECT u.userID, u.username, u.email, u.country, u.city,  
         h.name AS hotelname, h.city AS hotelcity, rud.unavailableDateStart AS datestart, 
         rud.unavailableDateEnd AS dateend, rm.number AS roomnumber, r.Price AS price 
    FROM \`${DB}\`.\`rooms\` AS r 
    INNER JOIN \`${DB}\`.\`hotels\` AS h 
         ON r.HotelID = h.HotelID 
    INNER JOIN \`${DB}\`.\`room_numbers\`AS rm 
         ON r.roomId = rm.roomId
    INNER JOIN \`${DB}\`.\`room_unavailable_dates\` AS rud 
          ON rm.ID=rud.hotelRoomId
    INNER JOIN  \`${DB}\`.\`users\` AS u
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
