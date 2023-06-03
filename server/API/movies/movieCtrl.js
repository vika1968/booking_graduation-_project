"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMovies = exports.getAllMovies = exports.insertIntoMoviesTable = exports.getMovieById = void 0;
const database_1 = __importDefault(require("../../DB/database"));
const getMovieById = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM \`movie-booking\`.\`movies\` WHERE movieID='${id}'`;
    database_1.default.query(query, (error, results) => {
        try {
            if (error) {
                return res.status(500).json({ success: false, error: "Internal Server Error" });
            }
            if (results.length === 0) {
                return res.status(404).json({ success: false, error: "Invalid Movie ID" });
            }
            const movie = results;
            return res.status(200).json({ movie });
        }
        catch (error) {
            res.status(500).send({ sucess: false, error: error.message });
        }
    });
};
exports.getMovieById = getMovieById;
function insertIntoMoviesTable(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, actors, releaseDate, posterUrl, featured, adminID } = req.body;
            const query = `INSERT INTO \`movie-booking\`.\`movies\` (title, description, actors, releaseDate, posterUrl, featured ) VALUES ("${title.replace(/"/g, '\\"')}", "${description.replace(/"/g, '\\"')}", "${actors.replace(/"/g, '\\"')}", "${releaseDate.replace(/"/g, '\\"')}", "${posterUrl.replace(/"/g, '\\"')}", ${featured});`;
            database_1.default.query(query, (err, results) => {
                try {
                    if (err)
                        throw err;
                    res.send({ results });
                }
                catch (error) {
                    res.status(500).send({ error: error.message });
                }
            });
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
}
exports.insertIntoMoviesTable = insertIntoMoviesTable;
function getAllMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = 'SELECT * FROM `movie-booking`.`movies`';
            let movies;
            database_1.default.query(query, (err, results) => {
                try {
                    if (err)
                        throw err;
                    movies = results;
                    if (!movies) {
                        return res.status(500).json({ message: "Request Failed" });
                    }
                    return res.status(200).json({ movies });
                }
                catch (error) {
                    res.status(500).send({ error: error.message });
                }
            });
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
}
exports.getAllMovies = getAllMovies;
const searchMovies = (req, res) => {
    try {
        const searchQuery = req.body.query || '';
        const query = `SELECT * FROM \`movie-booking\`.\`movies\` WHERE title LIKE "%${(searchQuery || '').replace(/"/g, '\\"')}%" OR description LIKE "%${(searchQuery || '').replace(/"/g, '\\"')}%"`;
        database_1.default.query(query, (err, results) => {
            if (err) {
                res.status(500).json({ success: false, error: "Internal server error" });
            }
            else {
                res.json({ success: true, movies: results });
            }
        });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};
exports.searchMovies = searchMovies;
