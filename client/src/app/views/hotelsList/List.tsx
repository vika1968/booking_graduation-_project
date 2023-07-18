import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import Header from "../../../components/header/Header";
import Navbar from "../../../components/navbar/Navbar";
import SearchItem from "../../../components/searchItem/SearchItem";
import useFetchClient from "../../../hooks/useFetchClient";
import { HotelInterface } from "../../../helpers/hotelInterface";
import { useDispatch } from "react-redux";
import { addSearch} from "../../../features/search/searchSlice";
import { formatDatesToString } from "../../../helpers/transformDateToValidFormat";
//import { SERVER_URL } from "../../../config/config";
import "./list.scss";

const List: React.FC = () => { 
  const SERVER_URL = process.env.REACT_APP_SERVER_URL?.replace(/['"`]+/g, '');
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState<number | undefined>(undefined);
  const [max, setMax] = useState<number | undefined>(undefined);  
  const { data, loading, error, reFetch } = useFetchClient<HotelInterface[]>(
    `${SERVER_URL}/api/hotels?city=${destination}&min=${min || 0}&max=${max || 1000000}&limit=10`
    );

  const dispatch = useDispatch(); 
  const handleClick = () => {   
    if (
      destination !== location.state.destination ||
      options !== location.state.options ||
      dates !== location.state.dates
    ) {   
      
    reFetch();

    dispatch(
      addSearch({
       city: destination,      
       dates: formatDatesToString(dates),
       options: options,
      })
    );
  }
  };

  useEffect(() => {
    dispatch(
      addSearch({
        city:  destination,
        dates: formatDatesToString(dates),
        options: options,
      })
    );
  }, [dates, options]);


 const handleOption = (optionName: keyof typeof options, value: string) => {
    if (optionName==='minPrice'){
      setMin(Number(value))
    }
    if (optionName==='maxPrice'){
      setMax(Number(value))
    }
    
    setOptions((prev: typeof options) => ({
      ...prev,
      [optionName]: parseInt(value),
    }));
 };

  return (
    <div>
      <Navbar />
      <Header type="list" city={destination} />
      <div className="list-container">
        <div className="list-wrapper">
          <div className="list-search">
            <h1 className="list-search__title">Search</h1>
            <div className="list-search__item">
              <label className="list-search__label">Destination</label>            
              <input
                className="list-search__input"
                placeholder={destination}
                onChange={(e) => setDestination(e.target.value)}
                type="text"
              />
            </div>
            <div className="list-search__item">
              <label className="list-search__label">Check-in Date</label>
              <span
                className="list-search__date"
                onClick={() => setOpenDate(!openDate)}
              >
                {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="list-search__item">
              <label className="list-search__label">Options</label>
              <div className="list-search__options">
                <div className="list-search__option-item">
                  <span className="list-search__option-text">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    placeholder={'0'}
                    min="0"
                    //onChange={(e) => setMin(Number(e.target.value))}
                    onChange={(e) => handleOption("minPrice", e.target.value)}
                    className="list-search__option-input"
                  />
                </div>
                <div className="list-search__option-item">
                  <span className="list-search__option-text">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    placeholder={'1000000'}
                    min="0"
                    className="list-search__option-input"
                   // onChange={(e) => setMax(Number(e.target.value))}
                    onChange={(e) => handleOption("maxPrice", e.target.value === "0" ? "1000000" : e.target.value)}
                  />
                </div>
                <div className="list-search__option-item">
                  <span className="list-search__option-text">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="list-search__option-input"
                    placeholder={options.adult}
                    onChange={(e) => handleOption("adult", e.target.value)}
                  />
                </div>
                <div className="list-search__option-item">
                  <span className="list-search__option-text">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="list-search__option-input"
                    placeholder={options.children}
                    onChange={(e) => handleOption("children", e.target.value)}
                  />
                </div>
                <div className="list-search__option-item">
                  <span className="list-search__option-text">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="list-search__option-input"
                    placeholder={options.room}
                    onChange={(e) => handleOption("room", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button className="list-search__button" onClick={handleClick}>
              Search!!!!
            </button>
          </div>
          <div className="list-result">
            {loading ? (
              "loading"
            ) : (
              <>
                {data &&
                  data.map((item) => (
                    <SearchItem item={item} key={item.hotelID} />
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
