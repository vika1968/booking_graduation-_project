import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCircleXmark,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import Navbar from "../../../components/navbar/Navbar";
import Reserve from "../../../components/reserve/Reserve";
import useFetchClient from "../../../hooks/useFetchClient";
import { HotelInterface } from "../../../helpers/hotelInterface";
import { PhotoInterface } from "../../../helpers/photoInterface";
import { userSelector } from "../../../features/user/userSlice";
import { useAppSelector } from "../../hooks";
import { User } from "../../../features/user/userModel";
import { searchSelector } from "../../../features/search/searchSlice";
import moment from "moment"; // JavaScript library for parsing, manipulating, and formatting dates and times.
import Promotion from "../../../components/promotion/Promotion";
import "./hotel.scss";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // Hotel ID
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error, reFetch } = useFetchClient<HotelInterface>(
    `/api/hotels/findByID/${id}`
  );

  const {
    data: photoData,
    loading: loadingPhoto,
    error: errorPhoto,
    reFetch: reFetchPhoto,
  } = useFetchClient<PhotoInterface[]>(`/api/hotels/findHotelPhoto/${id}`);

  const numberOfPhotos: number = photoData ? photoData.length : 0;

  const user = useAppSelector(userSelector) as User[] | null;

  const navigate = useNavigate();
  const search = useAppSelector(searchSelector);

  const dates = search?.dates;
  const options = search?.options;
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1: Date, date2: Date): number {
    const parsedDate1 = moment(date1, "DD/MM/YYYY HH:mm:ss");
    const parsedDate2 = moment(date2, "DD/MM/YYYY HH:mm:ss");

    const timeDiff = Math.abs(parsedDate2.valueOf() - parsedDate1.valueOf());
    let diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    if (diffDays === 0) {
      diffDays = 1;
    }
    return diffDays;
  }

  const days = dates ? dayDifference(dates[0].endDate, dates[0].startDate) : 1;

  const handleOpen = (i: number): void => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction: string): void => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? numberOfPhotos - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === numberOfPhotos - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = (): void => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotel-container">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="slider__close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="slider__arrow"
                onClick={() => handleMove("l")}
              />
              <div className="slider__wrapper">
                <img
                  src={
                    photoData && photoData[slideNumber]
                      ? photoData[slideNumber].image_path
                      : ""
                  }
                  alt=""
                  className="slider__img"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="slider__arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotel-wrapper">
            <button className="hotel-wrapper__bookNow" onClick={handleClick}>
              Reserve or Book Now!
            </button>
            
            <h1 className="hotel-wrapper__title">{data?.name}</h1>
            <div className="hotel-wrapper__address">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data?.address}</span>
            </div>
            <span className="hotel-wrapper__distance">
              Excellent location – {data?.distance}m from center
            </span>
            
            <span className="hotel-wrapper__priceHighlight">
              Book a stay over ${data?.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotel-wrapper__images">
              {photoData &&
                photoData.map((photo: PhotoInterface, i: number) => (
                  <div className="hotel-wrapper__imgWrapper" key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo.image_path}
                      alt=""
                      className="hotel-wrapper__img"
                    />
                  </div>
                ))}
            </div>
            <div className="hotel-wrapper__details">
              <div className="hotel-wrapper__detailsTexts">
                <h1 className="hotel-wrapper__title">{data?.title}</h1>
                <p className="hotel-wrapper__desc">{data?.description}</p>
              </div>
              <div className="hotel-wrapper__detailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>
                    ${days * (data?.cheapestPrice ?? 1) * (options?.room ?? 1)}
                  </b>{" "}
                  ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>                
               
              </div>              
            </div>
            <button className="hotel-wrapper__back" onClick={() => navigate("/")}>Back to global search</button>
          </div>
          <Promotion />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
