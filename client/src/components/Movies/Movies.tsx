import React, { useCallback, useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import { getAllMovies } from "../../helpers/api-helpers";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/user/userSlice";
import axios from "axios";
import { User } from "../../features/user/userModel";
import MovieScheme from "../../helpers/MovieScheme";

const Movies = () => {
  const [movies, setMovies] = useState<MovieScheme[]>();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const user = useAppSelector(userSelector) as User[] | null;

  const fetchData = async () => {
    try {
      const data = await getAllMovies();
      setMovies(data.movies);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleGoBack = () => {
    navigate(`/homepage`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };


  // ---------------------Gili  this information. :) -------------------------------
  //   // I've read about callback and tried to use them. The code works. You can try. (Second block)
  //   // Using useCallback helps optimize the useEffect and useState hooks, as it prevents the searchMovies function from being re-created every time the component is rendered.
  //   // As a result, when the searchQuery dependency changes, useEffect will not consider the searchMovies function as new and will not call it again.
  //   // Thus, using a second block of code can reduce redundant function calls and improve performance when working with hooks.
  //   //This is irrelevant with a small amount of data like mine and a small number of requests.
  //   // That's why I left first block, because we didn't learn callback, OK?

  //-------------First block ---------------------------------------
  // useEffect(() => {
  //   if (searchQuery.trim() !== "") {
  //     searchMovies(searchQuery)
  //       .then((data) => {
  //         setMovies(data.movies);
  //       })
  //       .catch((err: any) => {
  //         console.log(err);
  //       });
  //   } else {
  //     fetchData();
  //   }
  // }, [searchQuery]);

  // const searchMovies = async (query: string) => {
  //   try {
  //     const response = await axios.post("/api/movie/search-movies", { query });
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };
  //-------------Second block useCallback---------------------------------------
  const searchMovies = useCallback(async (query: string) => {
    try {
      const response = await axios.post("/api/movie/search-movies", { query });     
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      searchMovies(searchQuery)
        .then((data) => {
          setMovies(data.movies);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      fetchData();
    }
  }, [searchQuery, searchMovies]); 

  return (
    <div className="main__container">
      <div className="movies__header-container">
        <div className="movies__header">
          <h4 className="movies__title">Movie list</h4>
          <div className="movies__search">
            <input
              type="text"
              placeholder="Search movies here... To cancel the search, press 'Backspace' on the keyboard several times."
              value={searchQuery}
              onChange={handleSearchChange}
              className="movies__input"
            />
          </div>
        </div>
      </div>
      <div className="movies">
        <div className="movies__list">
          {movies &&
            movies.map((movie) => (
              <MovieItem
                key={movie.movieID}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                title={movie.title}
                movieID={movie.movieID}
              />
            ))}
        </div>

        <div className="booking-btn__container">
          <button className="booking-btn__goBack" onClick={handleGoBack}>
            Go to latest releases
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movies;
