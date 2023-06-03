"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieCtrl_1 = require("./movieCtrl");
const movieRouter = express_1.default.Router();
movieRouter.get("/", movieCtrl_1.getAllMovies);
movieRouter.get("/:id", movieCtrl_1.getMovieById);
movieRouter.post("/search-movies", movieCtrl_1.searchMovies);
movieRouter.post("/", movieCtrl_1.insertIntoMoviesTable);
exports.default = movieRouter;
