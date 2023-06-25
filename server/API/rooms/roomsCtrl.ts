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

export const getRoomTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = `
    SELECT * FROM  \`hotel-booking\`.room_types
  `;
    connection.query(query, (err, result) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(result);
      }
    });
  } catch (err) {
    next(err);
  }
}


export const createRoom = async (req: Request, res: Response) => {
  try {
    const hotelID = req.params.hotelID;
    const { title, price, maxPeople, description, roomNumbers, typeID } = req.body;


    const checkRoomQuery = `
      SELECT * FROM \`hotel-booking\`.\`rooms\` WHERE hotelID = ? AND title = ? AND price = ? AND maxPeople = ? AND description = ? AND typeID = ?;
    `;
    const checkRoomValues = [hotelID, title, price, maxPeople, description, typeID];

    connection.query(checkRoomQuery, checkRoomValues, (error, checkRoomResults: RowDataPacket[]) => {
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
        INSERT INTO \`hotel-booking\`.\`rooms\` (hotelID, title, price, maxPeople, description, typeID)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
      const roomValues = [hotelID, title, price, maxPeople, description, typeID];

      connection.query(roomQuery, roomValues, (error, roomResults: any) => {
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
        const roomNumbersValues = roomNumbers.map((room: any) => `(${roomId}, ${room.number})`).join(", ");
        console.log(roomNumbers)
        connection.query(roomNumbersQuery + roomNumbersValues, (error, roomNumbersResults) => {
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
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};


export const deleteRoom = async (req: Request, res: Response) => {
  try {
    console.log('Delete room')

    const { id } = req.params;
    const query = `DELETE FROM \`hotel-booking\`.rooms WHERE roomID = '${id}'`;



    connection.query(query, (err, result: OkPacket) => {
      if (err) {
        res.status(404).json({ error: 'Room  has not  been delete' });
      } else {
        if (result.affectedRows > 0) {
          console.log(result)
          res.status(200).json({ message: 'Room has been deleted.' });

        } else {
          res.status(404).json({ error: 'Room not found' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

// export const updateRoomAvailability = async (req: Request, res: Response) => {
//   try {
//     console.log('updateRoomAvailability');
//     const { id } = req.params;
//     const { user, dates } = req.body;

//     const selectQuery = 'SELECT ID FROM `hotel-booking`.`room_numbers` WHERE number = ?';
//     const selectValues = [id];
//     console.log(selectValues);
//     connection.query(selectQuery, selectValues, (selectError, rows: RowDataPacket[]) => {
//       if (selectError) {
//         console.log(selectError);
//         console.log(user);
//         res.status(500).json({ error: 'Failed to update room availability' });
//       } else if (rows.length === 0) {
//         res.status(404).json({ error: 'Room not found' });
//       } else {
//         const hotelRoomId = rows[0].ID;

//         const checkQuery = `
//           SELECT * FROM \`hotel-booking\`.\`room_unavailable_dates\`
//           WHERE hotelRoomId = ? 
//           AND ((unavailableDateStart <= ? AND unavailableDateEnd >= ?) OR
//                (unavailableDateStart <= ? AND unavailableDateEnd >= ?) OR
//                (unavailableDateStart >= ? AND unavailableDateEnd <= ?))
//           LIMIT 1;
//         `;

//         const checkValues = [
//           hotelRoomId,
//           new Date(dates[0]),
//           new Date(dates[0]),
//           new Date(dates[1]),
//           new Date(dates[1]),
//           new Date(dates[0]),
//           new Date(dates[1])
//         ];

//         connection.query(checkQuery, checkValues, (checkError, checkResult: RowDataPacket[]) => {
//           if (checkError) {
//             console.log(checkError);
//             res.status(500).json({ error: 'Failed to update room availability' });
//           } else if (checkResult.length > 0) {
//             res.status(400).json({ error: 'Room is already unavailable for the selected dates' });
//           } else {
//             const insertQuery = `
//               INSERT INTO \`hotel-booking\`.\`room_unavailable_dates\` (hotelRoomId, userID, unavailableDateStart, unavailableDateEnd)
//               VALUES (?, ?, ?, ?);
//             `;

//             const insertValues = [hotelRoomId, user, new Date(dates[0]), new Date(dates[1])];

//             connection.query(insertQuery, insertValues, (insertError, result) => {
//               if (insertError) {
//                 console.log(insertError);
//                 res.status(500).json({ error: 'Failed to update room availability' });
//               } else {
//                 console.log(result);
//                 res.status(200).json("Room status has been updated.");
//               }
//             });
//           }
//         });
//       }
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).send({ success: false, error: error.message });
//   }
// };

export const updateRoomAvailability = async (req: Request, res: Response) => {
  try {
    console.log('updateRoomAvailability');
    const { id } = req.params;
    const { user, dates } = req.body;
    console.log(id);
    const selectQuery = 'SELECT ID FROM `hotel-booking`.`room_numbers` WHERE number = ?';
    const selectValues = [id];

    connection.query(selectQuery, selectValues, (selectError, rows: RowDataPacket[]) => {
      if (selectError) {
        res.status(500).json({ error: 'Failed to update room availability' });
      } else if (rows.length === 0) {
        res.status(404).json({ error: 'Room not found' });
      } else {
        const hotelRoomId = rows[0].ID;

        const checkQuery = `
          SELECT * FROM \`hotel-booking\`.\`room_unavailable_dates\`
          WHERE hotelRoomId = ? 
          AND (
            (YEAR(unavailableDateStart) <= YEAR(?) AND MONTH(unavailableDateStart) <= MONTH(?) AND YEAR(unavailableDateEnd) >= YEAR(?) AND MONTH(unavailableDateEnd) >= MONTH(?)) OR
            (YEAR(unavailableDateStart) >= YEAR(?) AND MONTH(unavailableDateStart) >= MONTH(?) AND YEAR(unavailableDateEnd) >= YEAR(?) AND MONTH(unavailableDateEnd) >= MONTH(?))
          )
          LIMIT 1;
        `;

        const checkValues = [
          hotelRoomId,         
          dates[0],
          dates[0],
          dates[1],
          dates[1],
          dates[0],
          dates[1],
          dates[0],
          dates[1]
        ];

        connection.query(checkQuery, checkValues, (checkError, checkResult: RowDataPacket[]) => {
          if (checkError) {          
            res.status(500).json({ error: 'Failed to update room availability' });
          } else if (checkResult.length > 0) {
            res.status(400).json({ error: `Room ${selectValues} is already unavailable for the selected dates` });
          } else {
            const insertQuery = `
              INSERT INTO \`hotel-booking\`.\`room_unavailable_dates\` (hotelRoomId, userID, unavailableDateStart, unavailableDateEnd)
              VALUES (?, ?, ?, ?);
            `;

            const insertValues = [hotelRoomId, user, new Date(dates[0]), new Date(dates[1])];

            connection.query(insertQuery, insertValues, (insertError, result) => {
              if (insertError) {
                res.status(500).json({ error: 'Failed to update room availability' });
              } else {
                res.status(200).json("Room status has been updated.");
              }
            });
          }
        });
      }
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ success: false, error: error.message });
  }
};














