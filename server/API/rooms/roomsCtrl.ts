import express, { Request, Response, NextFunction } from "express";
import connection from "../../DB/database";
import { OkPacket, RowDataPacket } from "mysql2/promise";


export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { min, max, limit } = req.query;

    // console.log('min')
    // console.log(max)
    // console.log(limit)

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

    // Проверка наличия записи в таблице rooms с указанными параметрами
    const checkRoomQuery = `
      SELECT * FROM \`hotel-booking\`.\`rooms\` WHERE hotelID = ? AND title = ? AND price = ? AND maxPeople = ? AND description = ? AND typeID = ?;
    `;

    const checkRoomValues = [hotelID, title, price, maxPeople, description, typeID];

    connection.query(checkRoomQuery, checkRoomValues, (error, checkRoomResults: any) => {
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


export const updateRoomAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { dates } = req.body;
    
    const query = 'UPDATE \`hotel-booking\`.rooms SET unavailableDates = JSON_ARRAY_APPEND(unavailableDates, "$", ?) WHERE roomId = ?';
    const values = [dates, id];
    
    connection.query(query, values, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Failed to update room availability' });
      } else {
        res.status(200).json("Room status has been updated.");
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};










