  

import express from "express";
import connection from "../../DB/database";

interface Order {
  id: number;
  email: string;
  title: string;
  seatNumber: number;
  date: string;
}

export const getOrdersByUserID = (req: express.Request, res: express.Response) => {
  const id = req.params.id;

  const query = `
  SELECT b.bookingID As id, u.email, m.title, b.seatNumber, b.date FROM \`movie-booking\`.\`booking\` AS b
  INNER JOIN \`movie-booking\`.\`users\` AS u ON b.userID = u.userID
  INNER JOIN \`movie-booking\`.\`movies\` AS m ON b.movieID = m.movieID
  WHERE b.userID = ${id};
`; 

  connection.query(query, (error, results) => {
    try {
      if (error) {      
        return res.status(500).json({ success: false, error: "Internal Server Error" });
      }

      if ((results as Order[]).length === 0) {           
        return res.status(404).json({ success: false, error: "Invalid userID" });
      }

      const orders = results; 
     
      return res.status(200).json({ orders });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  });
};
