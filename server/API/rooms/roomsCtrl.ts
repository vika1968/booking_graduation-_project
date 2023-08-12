import { Request, Response } from "express";
import connection from "../../DB/database";
import { OkPacket, RowDataPacket } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let environment = process.env.ENVIRONMENT;
let DB: string | undefined;
if (environment === "DEV") {
  DB = process.env.DATABASE_DEV;
} else {
  DB = process.env.DATABASE_PROD;
}

export const getRooms = async (req: Request, res: Response) => {
  try {
    const { min, max, limit } = req.query;

    const query = `SELECT * FROM \`${DB}\`.rooms`;

    const values = [min, max, limit];
    connection.query(query, values, (err, result: RowDataPacket[]) => {
      if (err) {
        res
          .status(500)
          .send({ success: false, error: "Error retrieving hotels." });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: "No hotels found." });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getRoomTypes = async (req: Request, res: Response) => {
  try {
    const query = `
    SELECT * FROM \`${DB}\`.room_types`;

    connection.query(query, (err, result: RowDataPacket[]) => {
      if (err) {
        res
          .status(500)
          .send({ success: false, error: "Error retrieving room types." });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: "No room types found." });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const hotelID = req.params.hotelID;
    const { title, price, maxPeople, description, roomNumbers, typeID } =
      req.body;

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

    connection.query(
      checkRoomQuery,
      checkRoomValues,
      (error, checkRoomResults: RowDataPacket[]) => {
        if (error) {
          return res.status(500).send({
            success: false,
            error: "Failed to check room data in the database.",
          });
        }

        if (checkRoomResults.length > 0) {
          return res.status(500).send({
            success: false,
            error:
              "Room data already exists in the database for the specified hotel.",
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

        connection.query(roomQuery, roomValues, (error, roomResults: any) => {
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
            .map((room: any) => `(${roomId}, ${room.number})`)
            .join(", ");

          connection.query(
            roomNumbersQuery + roomNumbersValues,
            (error, roomNumbersResults) => {
              if (error) {
                return res.status(500).send({
                  success: false,
                  error:
                    "Failed to insert room numbers data into the database.",
                });
              }

              res.status(200).json({
                success: true,
                message: "Room successfully created and linked to the hotel.",
              });
            }
          );
        });
      }
    );
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM \`${DB}\`.rooms WHERE roomID = '${id}'`;

    connection.query(query, (err, result: OkPacket) => {
      if (err) {
        res.status(404).json({ error: "Room has not been deleted." });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ message: "Room has been deleted." });
        } else {
          res.status(404).json({ error: "Room not found" });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const updateRoomAvailability = async (req: Request, res: Response) => {
  try {
    const { roomNumber } = req.params;
    const { user, dates, hotelId } = req.body;

    const selectQuery = `SELECT rm.ID FROM \`${DB}\`.\`rooms\` AS r INNER JOIN \`${DB}\`.\`hotels\` AS h ON r.HotelID = h.HotelID INNER JOIN \`${DB}\`.\`room_numbers\` AS rm ON r.roomId = rm.roomId WHERE h.hotelId = ? AND rm.number = ?`;

    const selectValues = [hotelId, roomNumber];

    connection.query(
      selectQuery,
      selectValues,
      (selectError, rows: RowDataPacket[]) => {
        if (selectError) {
          res
            .status(500)
            .json({ error: "Failed to update room availability." });
        } else if (rows.length === 0) {
          res.status(404).json({ error: "Room not found." });
        } else {
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
            dates[1], //unavailableDateEnd
            dates[0], //unavailableDateStart
            dates[0], //unavailableDateStart
            dates[1], //unavailableDateEnd
          ];

          connection.query(
            checkQuery,
            checkValues,
            (checkError, checkResult: RowDataPacket[]) => {
              if (checkError) {
                res
                  .status(500)
                  .json({ error: "Failed to update room availability." });
              } else if (checkResult.length > 0) {
                res.status(400).json({
                  error: `Room ${roomNumber} is already unavailable for the selected dates.`,
                });
              } else {
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

                connection.query(
                  insertQuery,
                  insertValues,
                  (insertError, result) => {
                    if (insertError) {
                      res
                        .status(500)
                        .json({ error: "Failed to update room availability." });
                    } else {
                      res.status(200).json("Room status has been updated.");
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};
