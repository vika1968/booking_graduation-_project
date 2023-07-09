import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { searchSelector, updateSearch} from "../../features/search/searchSlice";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { useAppSelector } from "../../app/hooks";
import { parseISO } from "date-fns/fp";
import { transformDate } from "../../helpers/transformDateToValidFormat";
import "./featured.scss";

const Featured = () => {
  const dispatch = useDispatch();
  const searchRedux = useAppSelector(searchSelector);

  const [options, setOptions] = useState(() => {
    if (searchRedux && searchRedux.options) {
      const { minPrice, maxPrice, adult, children, room } = searchRedux.options;    
      return {
        minPrice,
        maxPrice,
        adult,
        children,
        room,
      };    
    } else {
      return {
        minPrice: 0,
        maxPrice: 1000000,
        adult: 1,
        children: 0,
        room: 1,
      };
    }
  });

  const navigate = useNavigate();

  const goToHotels = (destination: string) => {   
  
    dispatch(
      updateSearch({
        city: destination,
      })
    );
    if (searchRedux && searchRedux.dates[0]) {      
      setOptions({
        minPrice: searchRedux.options.minPrice
          ? searchRedux.options.minPrice
          : 0,
        maxPrice: searchRedux.options.maxPrice
          ? searchRedux.options.maxPrice
          : 1000000,
        adult: searchRedux.options.adult ? searchRedux.options.adult : 1,
        children: searchRedux.options.children
          ? searchRedux.options.children
          : 0,
        room: searchRedux.options.room ? searchRedux.options.room : 1,
      });

      const startDateString = transformDate(searchRedux.dates[0].startDate);
      const endDateString = transformDate(searchRedux.dates[0].endDate);

      const formattedStartDate = format( new Date(startDateString),"yyyy-MM-dd'T'HH:mm:ss");
      const startDate = parseISO(formattedStartDate);

      const formattedEndDate = format( new Date(endDateString), "yyyy-MM-dd'T'HH:mm:ss");
      const endDate = parseISO(formattedEndDate);

      const formattedDates = 
      [{ startDate: startDate, 
         endDate: startDate.getDate() !== endDate.getDate() ? endDate : endDate.setDate(endDate.getDate() + 1),
         key: "selection",
        },
      ];   
      navigate("/hotels", {state: { destination, dates: formattedDates, options }});
    }
  };

  return (
    <div className="featured">
      <div className="featured__item">
        <img
          src="https://media.istockphoto.com/id/1420218908/photo/aerial-view-of-la-sagrada-familia-cathedral-in-eixample-district-of-barcelona-spain.jpg?s=2048x2048&w=is&k=20&c=kxEnhPLp7lrPdcHBmLleau38q1HoJgfy4ZFhj0j-PMU="
          alt=""
          className="featured__img"         
          onClick={() => goToHotels("Barcelona")}
        />
        <div className="featured__titles">
          <h1>Barcelona</h1>
        </div>
      </div>
      <div className="featured__item">
        <img
          src="https://media.gettyimages.com/id/1381427766/photo/berlin-skyline-panorama-with-famous-tv-tower-at-alexanderplatz-germany.jpg?s=2048x2048&w=gi&k=20&c=1-BB6jerVyPatPCC2O2Cd02qg-FPdLZb7PryKnZUrPw="
          alt=""
          className="featured__img"
          onClick={() => goToHotels("Berlin")}
        />
        <div className="featured__titles">
          <h1>Berlin</h1>
        </div>
      </div>
      <div className="featured__item">
        <img
          src="https://www.berlin.de/imgscaler/Lsn6XXpQlE2B0VoAVx669OGZ5zwxeyCTBWuDd1pP-6s/ropen/L3N5czExLXByb2QvZGVwb3NpdHBob3Rvcy9zdGFlZHRlL2RlcG9zaXRwaG90b3NfNDE5NzU2MjVfbC0yMDE1LmpwZw.jpg?ts=1685018832"
          alt=""
          className="featured__img"
          onClick={() => goToHotels("Madrid")}
        />
        <div className="featured__titles">
          <h1>Madrid</h1>
        </div>
      </div>
      <div className="featured__item">
        <img
          src="https://media.istockphoto.com/id/1400112152/photo/london-red-buses-zooming-through-city-skyscrapers-night-street.jpg?s=2048x2048&w=is&k=20&c=OAZ1EiL1h7I1tuCR6DemQjk1rugsp2iGZAiB-tDBWyw="
          alt=""
          className="featured__img"
          onClick={() => goToHotels("London")}
        />
        <div className="featured__titles">
          <h1>London</h1>
        </div>
      </div>
    </div>
  );
};

export default Featured;
