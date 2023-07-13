import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.scss";
interface HotelData {
  hotelID: number;
  photos: string[];
  name: string;
  city: string;
  cheapestPrice: number;
  rating?: number;
}

const FeaturedProperties: React.FC = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  const hotelData = data as HotelData[];

  return (
    <div className="featured-properties">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {hotelData.map((item) => (
            <div className="featured-properties__item" key={item.hotelID}>
              <img
                src={item.photos[0]}
                alt=""
                className="featured-properties__img"
              />
              <span className="featured-properties__name">{item.name}</span>
              <span className="featured-properties__city">{item.city}</span>
              <span className="featured-properties__price">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="featured-properties__rating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
