

import express, { Request, Response, NextFunction } from "express";
import connection from "../../DB/database";
import { OkPacket, RowDataPacket } from "mysql2/promise";

export async function createHotel(req: express.Request, res: express.Response) {
  try {
    const name = req.body.newHotel.name;
    const type = req.body.newHotel.type;
    const city = req.body.newHotel.city;
    const address = req.body.newHotel.address;
    const distance = req.body.newHotel.distance;
    const title = req.body.newHotel.title;
    const description = req.body.newHotel.description;
    const cheapestPrice = req.body.newHotel.cheapestPrice;
    const featured: boolean = req.body.newHotel.featured;
    let newFeatured: number = 0
    const photos: string[] = req.body.newHotel.photos;
    const rating: number = 9.9

    if (featured === false) {
      newFeatured = 0
    }
    else if (featured === true) {
      newFeatured = 1
    }

    const query = `
      INSERT INTO \`hotel-booking\`.\`hotels\` (name, type, city, address, distance, title, description, rating, cheapestPrice, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const values = [name, type, city, address, distance, title, description, rating, cheapestPrice, newFeatured];

    connection.query(query, values, (error, hotelsResults: any) => {
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

      connection.query(photosQuery + photoValues, (error, photosResults) => {
        if (error) {
          return res.status(500).send({
            success: false,
            error: "Failed to insert hotel photos data into the database.",
          });
        }

        res.status(200).json({ success: true, message: 'Hotel has been inserted.' });

      });
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
}

export const updateHotel = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const { name, type, title, city } = req.body;

    const query = `
        UPDATE \`hotel-booking\`.hotels
        SET name = ?, type = ?, title = ?, city = ?
        WHERE hotelID =?
      `;

    const values = [name, type, title, city, id];
    connection.query(query, values, (err, result: OkPacket) => {
      if (err) {
        res.status(404).json({ error: 'Something wrong with updating hotel.' });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ success: true, message: 'Hotel has been updated!' });
        } else {
          res.status(404).json({ success: false, error: 'Hotel not found.' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const query = `DELETE FROM \`hotel-booking\`.hotels WHERE hotelID = ?`;
    const value = [id];

    connection.query(query, value, (err, result: OkPacket) => {
      if (err) {
        res.status(404).json({ error: 'Something went wrong. Error deleting hotel from the database.' });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Hotel has been deleted.' });

        } else {
          res.status(404).json({ error: 'Hotel not found.' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getHotel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM \`hotel-booking\`.hotels WHERE hotelID = ?';
    const values = [id];

    connection.query(query, values, (err, result: RowDataPacket[]) => {
      if (err) {
        res.status(404).json({ error: 'Hotel not found.' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ error: 'Hotel not found.' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getHotelByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const query = 'SELECT * FROM \`hotel-booking\`.hotels WHERE name = ?';
    const values = [name];

    connection.query(query, values, (err, result: RowDataPacket[]) => {
      if (err) {
        res.status(404).json({ error: 'No hotel found.' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ error: 'Hotel not found.' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getHotels = async (req: Request, res: Response) => {
  try {
    const { city, min, max, limit } = req.query;
    let query = 'SELECT *, (SELECT im.`image_path` FROM `hotel-booking`.`image_mapping` AS im INNER JOIN `hotel-booking`.`hotel_photos` hp ON im.`file_name` = hp.`photo` WHERE hp.hotelID = `hotel-booking`.`hotels`.`hotelID` LIMIT 1 ) AS `photo` FROM `hotel-booking`.`hotels` WHERE 1=1';
    const values = [];

    if (typeof city === 'string' && city.trim()) {
      query += ' AND city = ?';
      values.push(city);
    }

    if (min) {
      query += ' AND cheapestPrice >= ?';
      values.push(min);
    }

    if (max) {
      query += ' AND cheapestPrice <= ?';
      values.push(max);
    }    
    if (limit) {
      query += ' LIMIT ?';
      values.push(parseInt(limit.toString(), 10));
    }
 
    connection.query(query, values, (err, result: RowDataPacket[]) => {
      if (err) {
        res.status(500).send({ success: false, error: 'Error retrieving hotels.' });
        return;
      }

      if (result.length === 0) {
        res.status(404).json({ error: 'No hotels found.' });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getHotelByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const query = 'SELECT *, (SELECT im.`image_path` FROM `hotel-booking`.`image_mapping` AS im INNER JOIN `hotel-booking`.`hotel_photos` hp ON im.`file_name` = hp.`photo` WHERE hp.hotelID = `hotel-booking`.`hotels`.`hotelID` LIMIT 1) AS `photo` FROM `hotel-booking`.`hotels` WHERE hotelID = ?';
    const values = [id];

    connection.query(query, values, (err, result: RowDataPacket[]) => {
      if (err) {
        res.status(404).json({ error: 'Hotel not found.' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ error: 'Hotel not found.' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getHotelPhotoByID = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const query = 'SELECT * FROM `hotel-booking`.`hotel_photos` AS hp INNER JOIN `hotel-booking`.`image_mapping` AS im ON hp.`photo` = im.`file_name` WHERE hotelID = ?';
    const values = [id];

    connection.query(query, values, (err, result: RowDataPacket[]) => {
      if (err) {
        res.status(404).json({ error: 'Photos not found.' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ error: 'Photos not found.' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getHotelRooms = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const query = `SELECT r.*, rd.Number FROM \`hotel-booking\`.rooms AS r INNER JOIN \`hotel-booking\`.room_numbers AS rd ON r.roomId = rd.roomId WHERE r.hotelID = ?`;
    const values = [id];

    connection.query(query, req.params.id, (err, result: RowDataPacket[]) => {

      if (err) {
        res.status(404).json({ error: 'Room/s not found.' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ error: 'Room/s not found.' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};




