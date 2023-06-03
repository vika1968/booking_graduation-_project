import { useEffect, useState } from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import { getAllMovies } from "../helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";
import MovieScheme from "./../helpers/MovieScheme";
import { userSelector } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserByCookieMain } from "../features/user/userAPI";
import { User } from "../features/user/userModel";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState<MovieScheme[]>([]);
  const [emailInStore, setEmailInStore] = useState<string | null>(null);
  const location = useLocation();
  const email = location.state?.email || "";

  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(userSelector) as User[] | null;

  useEffect(() => {
    dispatch(getUserByCookieMain());

    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err: any) => console.log(err));
  }, []);

  useEffect(() => {
    if (loggedInUser !== null) {
      setEmailInStore(loggedInUser[0].email);
    } else {
      setEmailInStore(email);
    }
  }, [loggedInUser]);

  return (
    <div className="HomePage__wrapper">
      <h2>Hello : {emailInStore} </h2>
      <div className="HomePage__header">
        <img
          className="HomePage__logo"
          src="https://img.freepik.com/free-vector/cinema-stage-background-with-clapperboard-popcorn-chairs_1017-38722.jpg?w=1380&t=st=1683564862~exp=1683565462~hmac=53a85bdf6b58e70a6ca7d9f0e76624db6a39bd6622c26dbdca0c602122249f00"
          alt="cinema"
        />
      </div>
      <div className="HomePage__content">
        <h2 className="HomePage__title">Latest Releases</h2>
        <div className="HomePage__movies">
          {movies &&
            movies
              .slice(0, 4)
              .map((movie: MovieScheme, index) => (
                <MovieItem
                  key={movie.movieID}
                  posterUrl={movie.posterUrl}
                  releaseDate={movie.releaseDate}
                  title={movie.title}
                  movieID={movie.movieID}
                />
              ))}
        </div>
        <div className="HomePage__cta">
          <Link to="/movies" className="HomePage__button">
            View All Movies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
