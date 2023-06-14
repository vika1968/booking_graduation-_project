

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

export const updateHotel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name, type, city, address, distance, title, description, rating, cheapestPrice, featured } = req.body;
      const query = `
        UPDATE \`hotel-booking\`.hotels
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
    const query = `DELETE FROM \`hotel-booking\`.hotels WHERE hotelID = '${id}'`;
   // const values = [id];

    console.log(query)  

    connection.query(query,  (err, result: OkPacket) => {
      if (err) {
        next(err);
      } else {
        if (result.affectedRows > 0) {
          console.log(result)
          res.status(200).json({ message: 'Hotel has been deleted.' });

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
    const query = 'SELECT * FROM \`hotel-booking\`.hotels WHERE hotelID = ?';
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

export const getHotelByName = async (req: Request, res: Response, next: NextFunction) => {
  try {

    console.log('getHotelByName')
    const { name } = req.params;
    const query = 'SELECT * FROM \`hotel-booking\`.hotels WHERE name = ?';
    const values = [name];

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
    SELECT * FROM  \`hotel-booking\`.hotels
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
      FROM \`hotel-booking\`.hotels
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
      FROM \`hotel-booking\`.hotels
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
    const query = 'SELECT * FROM \`hotel-booking\`.rooms WHERE hotelID = ?';
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
