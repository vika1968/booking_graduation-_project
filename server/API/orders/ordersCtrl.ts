import express from "express";
import connection from "../../DB/database";
interface Order {
  id: number;
  username: string;
  email: string;
  country: string;
  city: string;
  hotelname: string;
  hotelcity: string;
  datestart: Date;
  dateend: Date;
  roomnumber: number;
  price: number;
}
export const getOrdersByUserID = (
  req: express.Request,
  res: express.Response
) => {
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

  connection.query(query, (error, results) => {
    try {
      if (error) {
        return res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }

      const orders = results;

      return res.status(200).json({ orders });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  });
};
