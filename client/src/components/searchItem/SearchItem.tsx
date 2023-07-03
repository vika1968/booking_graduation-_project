import React from "react";
import { Link } from "react-router-dom";
import "./searchItem.scss";
interface SearchItemProps {
  item: {
    hotelID: number;
    name: string;
    type: string;
    city: string;
    address: string;
    distance: string;
    title: string;
    description: string;
    rating: number;
    cheapestPrice: number;
    featured: string | number;
    photo: string;
    [key: string]: number | string;
  };
}

const SearchItem: React.FC<SearchItemProps> = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photo} alt="" className="searchItem__img" />
      <div className="searchItem__desc">
        <h1 className="searchItem__title">{item.name}</h1>
        <span className="searchItem__distance">
          {item.distance}m from center
        </span>
        <span className="searchItem__taxiOp">Free airport taxi</span>
        <span className="searchItem__subtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="searchItem__features">{item.description}</span>
        <span className="searchItem__cancelOp">Free cancellation</span>
        <span className="searchItem__cancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="searchItem__details">
        {item.rating && (
          <div className="searchItem__rating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="searchItem__detailTexts">
          <span className="searchItem__price">${item.cheapestPrice}</span>
          <span className="searchItem__taxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item.hotelID}`}>
            <button className="searchItem__checkButton">
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
 export default SearchItem;