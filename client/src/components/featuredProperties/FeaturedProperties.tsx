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

  // Type assertion for data array
  const hotelData = data as HotelData[];

  return (
    <div className="Featured-Properties">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {hotelData.map((item) => (
            <div className="Featured-Properties__item" key={item.hotelID}>
              <img src={item.photos[0]} alt="" className="Featured-Properties__img" />
              <span className="Featured-Properties__name">{item.name}</span>
              <span className="Featured-Properties__city">{item.city}</span>
              <span className="Featured-Properties__price">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="Featured-Properties__rating">
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
