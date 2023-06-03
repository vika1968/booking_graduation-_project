import express from "express";
import {
  getAllMovies,
  getMovieById,
  insertIntoMoviesTable,
  searchMovies 
} from "./movieCtrl";

const movieRouter = express.Router();

movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/search-movies", searchMovies);
movieRouter.post("/", insertIntoMoviesTable);
export default movieRouter;
