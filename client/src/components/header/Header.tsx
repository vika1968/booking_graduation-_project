import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faBed,  faCalendarDays,  faPerson,} from "@fortawesome/free-solid-svg-icons";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { userSelector } from "../../features/user/userSlice";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { addSearch } from "../../features/search/searchSlice";
import { User } from "../../features/user/userModel";
import "./header.scss";

const Header = ({ type }: { type: string }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const user = useAppSelector(userSelector) as User[] | null;

  const handleOption = (name: keyof typeof options, operation: string) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const dispatch = useDispatch();

  const handleSearch = () => {
    const formattedDates = dates.map((date) => ({
      startDate: format(date.startDate, "dd/MM/yyyy HH:mm:ss"),
      endDate: format(date.endDate, "dd/MM/yyyy HH:mm:ss"),
    }));
    dispatch(
      addSearch({
        city: destination,
        dates: formattedDates,
        options,
      })
    );

    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list"
            ? "header__container header__container--listMode"
            : "header__container"
        }
      >
        <div className="header__list">
          <div className="header__listItem header__listItem--active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="header__title">
              Always happy to provide you with the best choice and discounts,
              don't miss a moment.
            </h1>
            <p className="header__desc">
              10% discount for <strong>regular</strong> subscribers
            </p>
            <div className="header__search">
              <div className="header__searchItem">
                <FontAwesomeIcon icon={faBed} className="header__icon" />
                <input
                  type="text"
                  placeholder="Desired Location"
                  className="header__searchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="header__searchItem">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="header__icon"
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="header__searchText"
                >{`${format(
                  dates[0].startDate,
                  "dd/MM/yyyy HH:mm:ss"
                )} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy HH:mm:ss"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item: any) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="header__searchItem">
                <FontAwesomeIcon icon={faPerson} className="header__icon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="header__searchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} rooms`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="options__item">
                      <span className="options__text">Adult</span>
                      <div className="options__counter">
                        <button
                          disabled={options.adult <= 1}
                          className="options__counterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="options__counterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="options__counterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="options__item">
                      <span className="options__text">Children</span>
                      <div className="options__counter">
                        <button
                          disabled={options.children <= 0}
                          className="options__counterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="options__counterNumber">
                          {options.children}
                        </span>
                        <button
                          className="options__counterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="options__item">
                      <span className="options__text">Room</span>
                      <div className="options__counter">
                        <button
                          disabled={options.room <= 1}
                          className="options__counterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="options__counterNumber">
                          {options.room}
                        </span>
                        <button
                          className="options__counterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="header__searchItem">
                <button className="header__btn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
