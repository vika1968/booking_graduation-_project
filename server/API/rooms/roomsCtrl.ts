import express, { Request, Response, NextFunction } from "express";
import connection from "../../DB/database";
import { OkPacket, RowDataPacket } from "mysql2/promise";


export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
try {    
    const { min, max, limit } = req.query;
    
    const query = `
    SELECT * FROM  \`hotel-booking\`.rooms
  `;
    const values = [min, max, limit];
    connection.query(query, values, (err, result) => {   
      if (err) {
        next(err);
      } else {
        res.status(200).json(result);
      }
    });
  } catch (err) {
    next(err);
  }
};


export async function createHotel(req: express.Request, res: express.Response) {
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
      const featured: boolean = req.body.newHotel.featured;
      let newFeatured: number = 0 
      const rooms = req.body.newHotel.rooms;
      const photos: string[] = req.body.newHotel.photos;
  
      if (featured===false) {
        newFeatured = 0
      }
      else if (featured===true) {
        newFeatured = 1
      }
   
      const hotelsQuery = `
        INSERT INTO \`hotel-booking\`.\`hotels\` (name, type, city, address, distance, title, description, rating, cheapestPrice, featured)
        VALUES ("${name}", "${type}", "${req.body.newHotel.city}", "${req.body.newHotel.address}", "${req.body.newHotel.distance}", "${req.body.newHotel.title}", "${req.body.newHotel.description}", "0", "${req.body.newHotel.cheapestPrice}", ${newFeatured});
      `; 
      
      connection.query(hotelsQuery, (error, hotelsResults: any) => {
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
  
        const photoValues = photos.map((photo: string) => `(${hotelId}, "${photo}")`).join(", ");
        // console.log(photosQuery + photoValues)
        connection.query(photosQuery + photoValues, (error, photosResults) => {
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
       
          const roomValues = rooms.map((room: any) => `(${hotelId}, "${room}")`).join(", ");
  
          connection.query(roomsQuery + roomValues, (error, roomsResults) => {
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
    } catch (error: any) {
      res.status(500).send({ success: false, error: error.message });
    }
  }



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





export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {


    const hotelID = req.params.hotelID;
    const { title, price, maxPeople, description, roomNumbers } = req.body;

    const roomQuery = `
      INSERT INTO \`hotel-booking\`.\`rooms\` (hotelID, title, price, maxPeople, description)
      VALUES (?, ?, ?, ?, ?);
    `;

    const roomValues = [hotelID, title, price, maxPeople, description];

    console.log(roomQuery)
    console.log(roomValues)
    connection.query(roomQuery, roomValues, (error, roomResults: any) => {
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

      const roomNumbersArray = roomNumbers.split(",").map((number: string) => number.trim());
      const roomNumbersValues = roomNumbersArray.map((number: string) => [roomId, parseInt(number), null]);

      connection.query(roomNumbersQuery, [roomNumbersValues], (error, roomNumbersResults) => {
        if (error) {
          return res.status(500).send({
            success: false,
            error: "Failed to insert room numbers data into the database.",
          });
        }

        res.status(200).json({ success: true, message: "Room successfully created and linked to the hotel." });
      });
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
}

