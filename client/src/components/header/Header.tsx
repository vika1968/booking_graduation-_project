import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import "./header.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange, Range } from "react-date-range";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";


// const Header = ({ type }: { type: string }) => {
//   const [destination, setDestination] = useState("");
//   const [openDate, setOpenDate] = useState(false);
//   const [dates, setDates] = useState<Range[]>([
//     {
//       startDate: new Date(), // Set initial start date as valid Date
//       endDate: new Date(), // Set initial end date as valid Date
//       key: "selection",
//     },
//   ]);
//   const [openOptions, setOpenOptions] = useState(false);
//   const [options, setOptions] = useState({
//     adult: 1,
//     children: 0,
//     room: 1,
//   });

//   const navigate = useNavigate(); //redirects the user to a page
//   const { user } = useContext(AuthContext);

//   const handleOption = (name: keyof typeof options, operation: "i" | "d") => {
//     setOptions((prev) => {
//       return {
//         ...prev,
//         [name]: operation === "i" ? prev[name] + 1 : prev[name] - 1,
//       };
//     });
//   };

//   const { dispatch } = useContext(SearchContext);

//   const handleSearch = () => {
//     dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
//     navigate("/hotels", { state: { destination, dates, options } });
//   };

//   return (
//     <div className="header">
//       <div
//         className={
//           type === "list"
//             ? "header__container header__container--listMode"
//             : "header__container"
//         }
//       >
//         <div className="header__list">
//           <div className="header__listItem header__listItem--active">
//             <FontAwesomeIcon icon={faBed} />
//             <span className="header__listText">Stays</span>
//           </div>
//         </div>
//         {type !== "list" && (
//           <>
//             <h1 className="header__title">
//               A lifetime of discounts? It'd be a dream
//             </h1>
//             <p className="header__desc">
//               Get rewarded for your travels - unlock instant savings of 10% or
//               more with your <strong>yourVoyage</strong> account
//             </p>
//             <div className="header__search">
//               <div className="header__searchItem">
//                 <FontAwesomeIcon icon={faBed} className="header__icon" />
//                 <input
//                   type="text"
//                   placeholder="Desired Location"
//                   className="header__searchInput"
//                   onChange={(e) => setDestination(e.target.value)}
//                 />
//               </div>
//               <div className="header__searchItem">
//                 <FontAwesomeIcon
//                   icon={faCalendarDays}
//                   className="header__icon"
//                 />
//                 <span
//                   onClick={() => setOpenDate(!openDate)}
//                   className="header__searchText"
//                 >{`${format(
//                   dates[0].startDate as Date,
//                   "dd/MM/yyyy"
//                 )} to ${format(dates[0].endDate as Date, "dd/MM/yyyy")}`}</span>
//                 {openDate && (
//                   <DateRange
//                     editableDateInputs={true}
//                     onChange={(item) => setDates([item.selection as Range])}
//                     moveRangeOnFirstSelection={false}
//                     ranges={dates}
//                     className="header__date"
//                     minDate={new Date()}
//                   />
//                 )}
//               </div>
//               <div className="header__searchItem">
//                 <FontAwesomeIcon icon={faPerson} className="header__icon" />
//                 <div className="header__options">
//                   <div className="header__option">
//                     <span className="header__optionLabel">Adults</span>
//                     <div className="header__optionCount">
//                       <span
//                         className="header__optionMinus"
//                         onClick={() => handleOption("adult", "d")}
//                       >
//                         -
//                       </span>
//                       <span className="header__optionValue">
//                         {options.adult}
//                       </span>
//                       <span
//                         className="header__optionPlus"
//                         onClick={() => handleOption("adult", "i")}
//                       >
//                         +
//                       </span>
//                     </div>
//                   </div>
//                   <div className="header__option">
//                     <span className="header__optionLabel">Children</span>
//                     <div className="header__optionCount">
//                       <span
//                         className="header__optionMinus"
//                         onClick={() => handleOption("children", "d")}
//                       >
//                         -
//                       </span>
//                       <span className="header__optionValue">
//                         {options.children}
//                       </span>
//                       <span
//                         className="header__optionPlus"
//                         onClick={() => handleOption("children", "i")}
//                       >
//                         +
//                       </span>
//                     </div>
//                   </div>
//                   <div className="header__option">
//                     <span className="header__optionLabel">Rooms</span>
//                     <div className="header__optionCount">
//                       <span
//                         className="header__optionMinus"
//                         onClick={() => handleOption("room", "d")}
//                       >
//                         -
//                       </span>
//                       <span className="header__optionValue">
//                         {options.room}
//                       </span>
//                       <span
//                         className="header__optionPlus"
//                         onClick={() => handleOption("room", "i")}
//                       >
//                         +
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <button className="header__searchButton" onClick={handleSearch}>
//                 Search
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;


const Header = ({ type }: { type: string }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState([
      {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      }
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
      adult:1,
      children:0,
      room:1,
  })

  const navigate = useNavigate(); //redirects the user to a page
  const { user } = useContext(AuthContext);

  const handleOption = (name: keyof typeof options, operation: any) => {
      setOptions((prev) => {
          return {
              ...prev,
              [name]: operation === "i" ? options[name] +1 : options[name] -1,
          };
      });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
      dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
      navigate("/hotels", { state: { destination, dates, options } });
  };
return (
  <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
          <div className="headerList">
              <div className="headerListItem active">
                  <FontAwesomeIcon icon={faBed}/>
                  <span>Stays</span>
              </div>
          </div>
          { type !== "list" &&
          <>
          <h1 className="headerTitle">Always happy to provide you with the best choice and discounts, don't miss a moment.</h1>
          <p className="headerDesc">10% discount for <strong>regular</strong> subscribers</p>
          <div className="headerSearch">
              <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faBed} className="headerIcon"/>
                  <input 
                      type="text" 
                      placeholder="Desired Location" 
                      className="headerSearchInput"
                      onChange={e=>setDestination(e.target.value)}
                  />
              </div>
              <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                  <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                  {openDate  && ( 
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
              <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                  <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult · ${options.children} children · ${options.room} rooms`}</span>
                  {openOptions && (
                  <div className="options">
                      <div className="optionItem">
                          <span className="optionText">Adult</span>
                          <div className="optionCounter">
                              <button 
                                  disabled={options.adult <= 1}
                                  className="optionCounterButton" 
                                  onClick={()=>handleOption("adult", "d")}>
                              -</button>
                              <span className="optionCounterNumber">{options.adult}</span>
                              <button 
                                  className="optionCounterButton" 
                                  onClick={()=>handleOption("adult", "i")}
                              >+</button>
                          </div>
                      </div>
                      <div className="optionItem">
                          <span className="optionText">Children</span>
                          <div className="optionCounter">
                              <button 
                                  disabled={options.children <= 0}
                                  className="optionCounterButton" 
                                  onClick={()=>handleOption("children", "d")}
                              >-</button>
                              <span className="optionCounterNumber">{options.children}</span>
                              <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                          </div>
                      </div>
                      <div className="optionItem">
                          <span className="optionText">Room</span>
                          <div className="optionCounter">
                              <button 
                                  disabled={options.room <= 1}
                                  className="optionCounterButton" 
                                  onClick={()=>handleOption("room", "d")}>
                              -</button> 
                              <span className="optionCounterNumber">{options.room}</span>
                              <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                          </div>
                      </div>
                  </div>
                  )}
              </div>
              <div className="headerSearchItem">
                  <button className="headerBtn" onClick={handleSearch}>Search</button>
              </div>
          </div></>}
      </div>
  </div>
)
}

export default Header;
