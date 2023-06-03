
import express from "express";
import connection from "../../DB/database";
import { RowDataPacket } from "mysql2";

interface MovieScheme {    
  movieID: number;
  title: string;
  description: string;
  actors: string;
  releaseDate: string;
  posterUrl: string;
  featured: boolean;   
}


export const getMovieById = (req: express.Request, res: express.Response) => {
  const id = req.params.id;

  const query = `SELECT * FROM \`movie-booking\`.\`movies\` WHERE movieID='${id}'`; 
  connection.query(query, (error, results) => {
    try {
      if (error) {     
        return res.status(500).json({  success: false, error: "Internal Server Error" });
      } 

      if ((results as MovieScheme[]).length === 0) {     
        return res.status(404).json({  success: false, error: "Invalid Movie ID" });
      }

      const movie = results; 
      return res.status(200).json({ movie });

    } catch (error: any) {    
      res.status(500).send({ sucess: false, error: error.message });
    }
  });
}


export async function insertIntoMoviesTable(req: express.Request, res: express.Response) {
  try {
    const { title, description, actors, releaseDate, posterUrl, featured, adminID } = req.body;
    const query = `INSERT INTO \`movie-booking\`.\`movies\` (title, description, actors, releaseDate, posterUrl, featured ) VALUES ("${title.replace(/"/g, '\\"')}", "${description.replace(/"/g, '\\"')}", "${actors.replace(/"/g, '\\"')}", "${releaseDate.replace(/"/g, '\\"')}", "${posterUrl.replace(/"/g, '\\"')}", ${featured});`;
  
    connection.query(query, (err, results) => {
      try {
        if (err) throw err;
        res.send({ results })
      } catch (error: any) {
        res.status(500).send({ error: error.message })
      }
    })
  } catch (error: any) {
    res.status(500).send({ error: error.message })
  }
}

export async function getAllMovies(req: express.Request, res: express.Response) {
  try {
    const query = 'SELECT * FROM `movie-booking`.`movies`'
  
    let movies: any;
    connection.query(query, (err, results) => {
      try {
        if (err) throw err;     
        movies = results;
        if (!movies) {
          return res.status(500).json({ message: "Request Failed" });
        }    
        return res.status(200).json({ movies });   

      } catch (error: any) {     
        res.status(500).send({ error: error.message })
      }
    })

  } catch (error: any) {  
    res.status(500).send({ error: error.message })
  }
}


export const searchMovies = (req: express.Request, res: express.Response) => {
  try {
    const searchQuery = req.body.query || '';
    const query = `SELECT * FROM \`movie-booking\`.\`movies\` WHERE title LIKE "%${(searchQuery || '').replace(/"/g, '\\"')}%" OR description LIKE "%${(searchQuery || '').replace(/"/g, '\\"')}%"`;
     connection.query(query, (err, results) => {
      if (err) {      
        res.status(500).json({ success: false, error: "Internal server error" });
      } else {
        res.json({ success: true, movies: results });
      }
    });
  } catch (error) {  
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
