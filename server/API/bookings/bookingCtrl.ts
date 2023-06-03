import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import connection from '../../DB/database';
import express from "express";

//---Add single record with preventing duplicates
export const newBooking = async (req: express.Request, res: express.Response) => {
  try {
    const { movie, date, seatNumber, user } = req.body;

    const query = `INSERT INTO \`movie-booking\`.\`booking\` (movieID, date, seatNumber, userID)
        SELECT ${movie}, '${date}', ${seatNumber}, ${user}
        FROM dual
        WHERE NOT EXISTS (SELECT movieID FROM \`movie-booking\`.\`booking\` WHERE movieID = ${movie} AND date = '${date}' AND seatNumber = ${seatNumber} AND userID = ${user});`;
     
    connection.query(query, (error, results: ResultSetHeader, fields) => {
      if (error) {
        return res.status(500).send({
          success: false,
          error: "This booking already exists",
        });
      }
      if (results.affectedRows > 0) {
        res.send({ success: "Your booking has been successfully added.", message: results });
      }
      else {
        res.send({ success: "Such booking already exists.", message: results });
      }

    });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
}

//---Add  records with preventing duplicates
export const newBookingBatch = async (req: express.Request, res: express.Response) => {
  try {
    const orders: { movieID: number, date: string, seatNumber: number, userID: number }[] = req.body.orders;

    const values = orders
      .map(({ movieID, date, seatNumber, userID }) => `SELECT ${movieID}, '${date}', ${seatNumber}, ${userID}`)
      .join(' UNION ALL ');

    const sql = `
      INSERT INTO \`movie-booking\`.\`booking\` (movieID, date, seatNumber, userID)
      WITH newBookings (movieID, date, seatNumber, userID) AS (
        SELECT * FROM (${values}) AS derived
      )
      SELECT movieID, date, seatNumber, userID FROM newBookings
      WHERE NOT EXISTS (
        SELECT 1 FROM \`movie-booking\`.\`booking\`
        WHERE movieID = newBookings.movieID
        AND date = newBookings.date
        AND seatNumber = newBookings.seatNumber
        AND userID = newBookings.userID
      )
    `;

    connection.query(sql, (error, results) => {
      if (error) {      
        res.status(500).send('Error inserting data into the database.');
      } else {
        res.send('Data successfully inserted into the database.');
      }
    });

  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};


export const getBookingById = async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  let booking;
  try {
    const [rows, fields] = await connection.execute(`SELECT * FROM \`movie-booking\`.\`booking\` WHERE bookingID=${id}`);
    booking = rows[0];
  } catch (error) {
    return console.log(error);
  }
  if (!booking) {
    return res.status(500).json({ message: 'Unexpected Error' });
  }
  return res.status(200).json({ booking });
};


