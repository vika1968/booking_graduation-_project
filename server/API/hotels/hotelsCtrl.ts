

import express, { Request, Response, NextFunction } from "express";
import connection from "../../DB/database";
import { OkPacket, RowDataPacket } from "mysql2/promise";

export const createHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, type, city, address, distance, title, description, rating, cheapestPrice, featured } = req.body;
    const query = `
      INSERT INTO hotels (name, type, city, address, distance, title, description, rating, cheapestPrice, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, type, city, address, distance, title, description, rating, cheapestPrice, featured];

    connection.query(query, values, (err, result: OkPacket) => {
      if (err) {
        next(err);
      } else {
        const hotelId = result.insertId;
        res.status(200).json({ hotelId, ...req.body });
      }
    });
  } catch (err) {
    next(err);
  }
};

export const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, type, city, address, distance, title, description, rating, cheapestPrice, featured } = req.body;
      const query = `
        UPDATE hotels
        SET name = ?, type = ?, city = ?, address = ?, distance = ?, title = ?, description = ?, rating = ?, cheapestPrice = ?, featured = ?
        WHERE hotelID = ?
      `;
      const values = [name, type, city, address, distance, title, description, rating, cheapestPrice, featured, id];
  
      connection.query(query, values, (err, result: OkPacket) => {
        if (err) {
          next(err);
        } else {
          if (result.affectedRows > 0) {
            res.status(200).json({ hotelId: id, ...req.body });
          } else {
            res.status(404).json({ error: 'Hotel not found' });
          }
        }
      });
    } catch (err) {
      next(err);
    }
  };

export const deleteHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM hotels WHERE hotelID = ?';
    const values = [id];

    connection.query(query, values, (err, result: OkPacket) => {
      if (err) {
        next(err);
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json('Hotel has been deleted.');
        } else {
          res.status(404).json({ error: 'Hotel not found' });
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM hotels WHERE hotelID = ?';
    const values = [id];

    connection.query(query, values, (err, result: RowDataPacket[]) => {
      if (err) {
        next(err);
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ error: 'Hotel not found' });
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { min, max, limit } = req.query;
    const query = `
      SELECT *
      FROM hotels
      WHERE cheapestPrice > IFNULL(?, 1) AND cheapestPrice < IFNULL(?, 999)
      LIMIT ?
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

export const countByCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cities } = req.query;
    const cityList: string[] = (cities as string).split(',');
    const placeholders = cityList.map(() => '?').join(', ');
    const query = `
      SELECT city, COUNT(*) AS count
      FROM hotels
      WHERE city IN (${placeholders})
      GROUP BY city
    `;
    const values = cityList;

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

export const countByType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = `
      SELECT type, COUNT(*) AS count
      FROM hotels
      GROUP BY type
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
};

export const getHotelRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM rooms WHERE hotelID = ?';
    const values = [id];

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
