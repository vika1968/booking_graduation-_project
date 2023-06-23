

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
    
      connection.query(photosQuery + photoValues, (error, photosResults) => {
        if (error) {
          return res.status(500).send({
            success: false,
            error: "Failed to insert hotel photos data into the database.",
          });
        }           

        res.status(200).json({  success: true,  message: 'Hotel has been inserted.' });
       
      });
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
}

export const updateHotel = async (req: Request, res: Response) => {
    try {

      console.log('update Hotel')
      const { id } = req.params;
      console.log(id)
      // const { name, type, city, address, distance, title, description, rating, cheapestPrice, featured } = req.body;
      // const query = `
      //   UPDATE \`hotel-booking\`.hotels
      //   SET name = ?, type = ?, city = ?, address = ?, distance = ?, title = ?, description = ?, rating = ?, cheapestPrice = ?, featured = ?
      //   WHERE hotelID = ?
      // `;
      // const values = [name, type, city, address, distance, title, description, rating, cheapestPrice, featured, id];

      const { name, type, title, city} = req.body;
      console.log(name)
      console.log(type)
      console.log(title)
      console.log(city)

      const query = `
        UPDATE \`hotel-booking\`.hotels
        SET name = "${name}", type = "${type}", title = "${title}", city = "${city}"
        WHERE hotelID =${id}
      `;
  
      console.log(query)
      connection.query(query, (err, result: OkPacket) => {
        if (err) {
          res.status(404).json({ error: 'Something wrong with updating hotel' });
        } else {
          if (result.affectedRows > 0) {
            res.status(200).json({  success: true,  message: 'Hotel has been updated!' });
          } else {
            res.status(404).json({  success: false, error: 'Hotel not found' });
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
    const query = `DELETE FROM \`hotel-booking\`.hotels WHERE hotelID = '${id}'`; 

   // console.log(query)  

    connection.query(query,  (err, result: OkPacket) => {
      if (err) {
        res.status(404).json({ error: 'Hotel has not been deleted' });
      } else {
        if (result.affectedRows > 0) {
       //   console.log(result)
          res.status(200).json({ message: 'Hotel has been deleted.' });

        } else {
          res.status(404).json({ error: 'Hotel not found' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getHotel = async (req: Request, res: Response) => {
  try {

   // console.log(getHotel)

    const { id } = req.params;
    const query = 'SELECT * FROM \`hotel-booking\`.hotels WHERE hotelID = ?';
    const values = [id];

    connection.query(query, values, (err, result: RowDataPacket[]) => {
      if (err) {
        res.status(404).json({ error: 'Hotel not found' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ error: 'Hotel not found' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getHotelByName = async (req: Request, res: Response) => {
  try {

  //  console.log('getHotelByName')
    const { name } = req.params;
    const query = 'SELECT * FROM \`hotel-booking\`.hotels WHERE name = ?';
    const values = [name];

    connection.query(query, values, (err, result: RowDataPacket[]) => {
      if (err) {
        res.status(404).json({ error: 'No hotel found' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ error: 'Hotel not found' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

// export const getHotels = async (req: Request, res: Response) => {
//   try {  
    
//     console.log('getHotels')
  
//     const { min, max, limit } = req.query;
//     console.log(min)
//     console.log(max)
//     console.log(limit)
  
//     const query = `
//     SELECT * FROM  \`hotel-booking\`.hotels
//   `;
//     const values = [min, max, limit];


//     connection.query(query, values, (err, result) => {   
//       if (err) {
//         res.status(404).json({ error: 'No hotels found' });
//       } else {
//         res.status(200).json(result);
//       }
//     });
//   } catch (error: any) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// };

// export const getHotels = async (req: Request, res: Response) => {
//   try {
//     const { city, min, max, limit } = req.query;

    
//     const query = `
//       SELECT * FROM \`hotel-booking\`.hotels
//       WHERE city = ? cheapestPrice > ? AND cheapestPrice < ?
//       LIMIT ?
//     `;
//    // const values = [min || 1, max || 999, limit];
//    const values = [city, min, max, limit];
//         console.log(min)
//     console.log(max)
//     console.log(limit)
    
//     connection.query(query, values, (err, result: RowDataPacket[]) => {
//       if (err) {
//         console.error('Error executing MySQL query:', err);
//         res.status(500).send({ success: false, error: 'Error retrieving hotels' });
//         return;
//       }
      
//       if (result.length === 0) {
//         res.status(404).json({ error: 'No hotels found' });
//       } else {
//         res.status(200).json(result);
//       }
//     });
//   } catch (error: any) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// };

export const getHotels = async (req: Request, res: Response) => {
  try {
    const { city, min, max, limit } = req.query;

    let query = 'SELECT *, (SELECT `photo` FROM `hotel-booking`.`hotel_photos` WHERE `hotel-booking`.`hotel_photos`.hotelID = `hotel-booking`.`hotels`.`hotelID` LIMIT 1 ) AS `photo`  FROM `hotel-booking`.`hotels` WHERE 1=1';
    const values = [];

    if (city) {
      query += ' AND city = ?';
      values.push(city);
    }

    if (min) {
      query += ' AND cheapestPrice > ?';
      values.push(min);
    }

    if (max) {
      query += ' AND cheapestPrice < ?';
      values.push(max);
    }

    if (limit) {
      query += ' LIMIT ?';
      values.push(parseInt(limit.toString(), 10));
    }
    console.log(query)
    console.log(values)
    connection.query(query, values, (err, result: RowDataPacket[]) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).send({ success: false, error: 'Error retrieving hotels' });
        return;
      }

      if (result.length === 0) {
        res.status(404).json({ error: 'No hotels found' });
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

    console.log('getHotelByID')
   
    const { id } = req.params;
    //const query = 'SELECT * FROM \`hotel-booking\`.hotels WHERE hotelID = ?';

    const query = 'SELECT *, (SELECT `photo` FROM `hotel-booking`.`hotel_photos` WHERE `hotel-booking`.`hotel_photos`.hotelID = `hotel-booking`.`hotels`.`hotelID` LIMIT 1 ) AS `photo`  FROM `hotel-booking`.`hotels` WHERE  hotelID = ?';

    const values = [id];

    connection.query(query, values, (err, result: RowDataPacket[]) => {
      if (err) {
        res.status(404).json({ error: 'Hotel not found' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ error: 'Hotel not found' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const  getHotelPhotoByID= async (req: Request, res: Response) => {
  try {

  //  console.log('getHotelPhotoByID') 
    
    const { id } = req.params;

    const query = 'SELECT  *  FROM `hotel-booking`.`hotel_photos` WHERE hotelID = ?';

    const values = [id];

    connection.query(query, values, (err, result: RowDataPacket[]) => {
      if (err) {
        res.status(404).json({ error: 'Photos not found' });
      } else {
        if (result.length > 0) {
         // console.log(result[0]) 
          res.status(200).json(result);
        } else {
          res.status(404).json({ error: 'Photos not found' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
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

// export const getHotelRooms = async (req: Request, res: Response, next: NextFunction) => {
//   try {

//     console.log('getHotelRooms')
//     const { id } = req.params;
//     const query = 'SELECT * FROM \`hotel-booking\`.rooms WHERE hotelID = ?';
//     const values = [id];

//     connection.query(query, values, (err, result) => {
//       if (err) {
//         next(err);
//       } else {
//         console.log(result)
//         res.status(200).json(result);
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// };


export const getHotelRooms_Back = async (req: Request, res: Response) => {
  try {

    console.log('getHotelRooms')
   
    const { id } = req.params;
    //const query = 'SELECT * FROM \`hotel-booking\`.hotels WHERE hotelID = ?';

   // let query = 'SELECT *, (SELECT `photo` FROM `hotel-booking`.`hotel_photos` WHERE `hotel-booking`.`hotel_photos`.hotelID = `hotel-booking`.`hotels`.`hotelID` LIMIT 1 ) AS `photo`  FROM `hotel-booking`.`hotels` WHERE  hotelID = ?';
   const query = 'SELECT * FROM \`hotel-booking\`.rooms WHERE hotelID = ?';
    const values = [id];   
    console.log(values)
    connection.query(query, values, (err, result: RowDataPacket[]) => {
      if (err) {
        res.status(404).json({ error: 'Room/s not found' });
      } else {
        console.log(result[0])
        if (result.length > 0) {
          console.log(result[0])
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ error: 'Room/s not found' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getHotelRooms = async (req: Request, res: Response) => {
  try {

    console.log('getHotelRooms')   
    const { id } = req.params;
   const query = `SELECT r.*, rd.Number, rd.unavailable_dates FROM \`hotel-booking\`.rooms AS r INNER JOIN \`hotel-booking\`.room_numbers AS rd ON r.roomId = rd.roomId WHERE r.hotelID = ?`;
   
    const values = [id];
   
    connection.query(query, req.params.id, (err, result: RowDataPacket[]) => {
         
      if (err) {
        res.status(404).json({ error: 'Room/s not found' });
      } else {
        console.log(result)
        if (result.length > 0) {
          console.log(result)
          console.log(result)
          res.status(200).json(result);
        } else {
          res.status(404).json({ error: 'Room/s not found' });
        }
      }
    });
  } catch (error: any) {
    res.status(500).send({ success: false, error: error.message });
  }
};




