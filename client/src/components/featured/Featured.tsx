import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addSearch } from "../../features/search/searchSlice";
import { useDispatch } from "react-redux";
import "./featured.scss";

const Featured = () => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState({
    minPrice: 0,
    maxPrice: 1000000,
    adult: 1,
    children: 0,
    room: 1,    
  });

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: (() => {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 1); // Add one day to the startDate
        return endDate;
      })(),
    },
  ]);  

  const navigate = useNavigate();
  const goTo = (destination: string) => {   
    
    dispatch(
      addSearch({
        city: destination,
        dates: dates,
        options
      })
    );
    navigate("/hotels", { state: { destination, dates, options } });
  }

  return (
    <div className="featured">
      <div className="featured__item">
        <img
          src="https://media.istockphoto.com/id/1420218908/photo/aerial-view-of-la-sagrada-familia-cathedral-in-eixample-district-of-barcelona-spain.jpg?s=2048x2048&w=is&k=20&c=kxEnhPLp7lrPdcHBmLleau38q1HoJgfy4ZFhj0j-PMU="
          alt=""
          className="featured__img"
          onClick={()=>goTo("Barcelona")}
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
          onClick={()=>goTo("Berlin")}
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
          onClick={()=>goTo("Madrid")}
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
          onClick={()=>goTo("London")}
        />
        <div className="featured__titles">
          <h1>London</h1>
        </div>
      </div>
    </div>
  );
};

export default Featured;

