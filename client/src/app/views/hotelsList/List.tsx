import React, { useState } from "react";
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
import "./list.scss";
import { DateRangeInterface } from "../../../helpers/dateRange";

const List: React.FC = () => {
  interface Options {
    adult: number;
    children: number;
    room: number;
  }

  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState<number | undefined>(undefined);
  const [max, setMax] = useState<number | undefined>(undefined);

  const { data, loading, error, reFetch } = useFetchClient<HotelInterface[]>(
    `/api/hotels?city=${destination}&min=${min || 0}&max=${max || 10000}&limit=5`
    );

  const dispatch = useDispatch();

  const handleClick = () => {
    if (
      destination !== location.state.destination ||
      min !== location.state.min ||
      max !== location.state.max ||
      options !== location.state.options ||
      dates!== location.state.dates
    ) {

    reFetch();

    // const formattedDates = dates.map((date: any) => ({
    //   startDate: format(date.startDate, "dd/MM/yyyy HH:mm:ss"),
    //   endDate: format(date.endDate, "dd/MM/yyyy HH:mm:ss"),
    // }));

    const formattedDates = dates.map(({ startDate, endDate }: DateRangeInterface) => ({
      startDate: format(startDate, "dd/MM/yyyy HH:mm:ss"),
      endDate: format(endDate, "dd/MM/yyyy HH:mm:ss"),
    }));
    dispatch(
      addSearch({
        city: destination,
        dates: formattedDates,
        options,
      })
    );
  }
  };

  const handleOption = (name: keyof typeof options, value: string) => {
    setOptions((prev: any) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
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
                    onChange={(e) => setMin(Number(e.target.value))}
                    className="list-search__option-input"
                  />
                </div>
                <div className="list-search__option-item">
                  <span className="list-search__option-text">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="list-search__option-input"
                    onChange={(e) => setMax(Number(e.target.value))}
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
