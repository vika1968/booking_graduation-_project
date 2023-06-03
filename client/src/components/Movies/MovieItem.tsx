
import React from "react";
import { Link } from "react-router-dom";

interface MovieItemProps {
  title: string;
  releaseDate: string;
  posterUrl: string;
  movieID: number;
}

const MovieItem: React.FC<MovieItemProps> = ({
  title,
  releaseDate,
  posterUrl,
  movieID,
}) => {
  return (
    <div className="movie-item" >
      <img className="movie-item__poster" src={posterUrl} alt={title} />
      <div className="movie-item__content">
        <h3 className="movie-item__title">{title}</h3>
        <p className="movie-item__release-date">
          {new Date(releaseDate).toDateString()}
        </p>
      </div>
      <div className="movie-item__actions">
        <Link
          className="movie-item__book-btn"
          to={`/booking/${movieID}`}       
        >
          Book Here
        </Link>
      </div>    
    </div>
  );
};

export default MovieItem;
