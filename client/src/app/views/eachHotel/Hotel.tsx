// import React, { useState, useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faLocationDot,
//   faCircleXmark,
//   faCircleArrowLeft,
//   faCircleArrowRight,
// } from "@fortawesome/free-solid-svg-icons";
// import { useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../../context/AuthContext";
// import { SearchContext } from "../../../context/SearchContext";
// import useFetch from "../../../hooks/useFetch";
// import Footer from "../../../components/footer/Footer";
// import Header from "../../../components/header/Header";
// import MailList from "../../../components/mailList/MailList";
// import Navbar from "../../../components/navbar/Navbar";
// import Reserve from "../../../components/reserve/Reserve";
// import "./hotel.scss";
// import useFetchClient from "../../../hooks/useFetchClient";
// import { HotelInterface } from "../../../helpers/hotelInterface";
// import { PhotoInterface } from "../../../helpers/photoInterface";

// const Hotel: React.FC = () => {
//   console.log( `HOTYEL`)
//   const location = useLocation();
//   const id = location.pathname.split("/")[2]; // Hotel ID
//   const [slideNumber, setSlideNumber] = useState<number>(0);
//   const [open, setOpen] = useState<boolean>(false);
//   const [openModal, setOpenModal] = useState<boolean>(false);

//   //const { data, loading, error, reFetch } = useFetch<HotelData>(
//     const { data, loading, error,reFetch } = useFetch<HotelInterface>(
//     `/api/hotels/findByID/${id}`
//   );

//   const { data: fotoData , loading: LoadingPhoto, error : WrirPhoto ,reFetch: reFetchPhoto } = useFetch<PhotoInterface[]>(
//     `/api/hotels/findHotelPhoto/${id}`
//   );

//   console.log( `/api/hotels/find/${id}`)

//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const { dates, options } = useContext(SearchContext);

//   const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

//   const dayDifference = (startDate: Date, endDate: Date): number => {
//     const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
//     const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
//     return diffDays;
//   };

//   let days: number = 0;

//   if (dates.length > 0) {
//     days = dayDifference(dates[0].startDate as Date, dates[0].endDate as Date);
//   }

//   const handleOpen = (i: number): void => {
//     setSlideNumber(i);
//     setOpen(true);
//   };

//   const handleMove = (direction: string): void => {
//     let newSlideNumber: number;

//     if (direction === "l") {
//       newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
//     } else {
//       newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
//     }
//     setSlideNumber(newSlideNumber);
//   };

//   const handleClick = (): void => {
//     if (user) {
//       setOpenModal(true);
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <Header type="list" />
//       {loading ? (
//         "Loading..."
//       ) : (
//         <div className="hotel-container">
//           {open && (
//             <div className="slider">
//               <FontAwesomeIcon
//                 icon={faCircleXmark}
//                 className="slider__close"
//                 onClick={() => setOpen(false)}
//               />
//               <FontAwesomeIcon
//                 icon={faCircleArrowLeft}
//                 className="slider__arrow"
//                 onClick={() => handleMove("l")}
//               />
//               <div className="slider__wrapper">
//                 <img
//                   src={fotoData[0].photo[slideNumber].photoID}
//                   alt=""
//                   className="slider__img"
//                 />
//               </div>
//               <FontAwesomeIcon
//                 icon={faCircleArrowRight}
//                 className="slider__arrow"
//                 onClick={() => handleMove("r")}
//               />
//             </div>
//           )}
//           <div className="hotel-wrapper">
//             <button className="hotel-wrapper__book-now" onClick={handleClick}>
//               Reserve or Book Now!
//             </button>
//             <h1 className="hotel-wrapper__title">{data[0].name}</h1>
//             <div className="hotel-wrapper__address">
//               <FontAwesomeIcon icon={faLocationDot} />
//               <span>{data[0].address}</span>
//             </div>
//             <span className="hotel-wrapper__distance">
//               Excellent location – {data[0].distance}m from center
//             </span>
//             <span className="hotel-wrapper__price-highlight">
//               Book a stay over ${data[0].cheapestPrice} at this property and get
//               a free airport taxi
//             </span>
//             <div className="hotel-wrapper__images">
//               {/* {fotoData[0].photos.map((photo, i) => ( */}
//                  {fotoData.map((photo, i) => (
//                 <div className="hotel-wrapper__img-wrapper" key={photo.photoID}>
//                   <img
//                     onClick={() => handleOpen(i)}
//                     src={photo[i].photo}
//                     alt=""
//                     className="hotel-wrapper__img"
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="hotel-wrapper__details">
//               <div className="hotel-wrapper__details-texts">
//                 <h1 className="hotel-wrapper__title">{data[0].title}</h1>
//                 <p className="hotel-wrapper__desc">{data[0].description}</p>
//               </div>
//               <div className="hotel-wrapper__details-price">
//                 <h1>Perfect for a {days}-night stay!</h1>
//                 <span>
//                   Located in the real heart of Krakow, this property has an
//                   excellent location score of 9.8!
//                 </span>
//                 <h2>
//                   <b>
//                     ${days * (data[0].cheapestPrice ?? 0) * (options.room ?? 0)}
//                   </b>{" "}
//                   ({days} nights)
//                 </h2>
//                 <button onClick={handleClick}>Reserve or Book Now!</button>
//               </div>
//             </div>
//           </div>
//           <MailList />
//           <Footer />
//         </div>
//       )}
//       {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
//     </div>
//   );
// };

// export default Hotel;

import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCircleXmark,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { SearchContext } from "../../../context/SearchContext";
import useFetch from "../../../hooks/useFetch";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import MailList from "../../../components/mailList/MailList";
import Navbar from "../../../components/navbar/Navbar";
import Reserve from "../../../components/reserve/Reserve";
import "./hotel.scss";
import useFetchClient from "../../../hooks/useFetchClient";
import { HotelInterface } from "../../../helpers/hotelInterface";
import { PhotoInterface } from "../../../helpers/photoInterface";

const Hotel: React.FC = () => {
  console.log(`HOTYEL`);
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // Hotel ID
  const [slideNumber, setSlideNumber] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data, loading, error, reFetch } = useFetchClient<HotelInterface>(
    `/api/hotels/findByID/${id}`
  );

  const {
    data: fotoData,
    loading: loadingPhoto,
    error: errorPhoto,
    reFetch: reFetchPhoto,
  } = useFetchClient<PhotoInterface[]>(`/api/hotels/findHotelPhoto/${id}`);

  console.log(`/api/hotels/findByID/${id}`);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  const dayDifference = (startDate: Date, endDate: Date): number => {
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  let days: number = 0;

  if (dates.length > 0) {
    days = dayDifference(dates[0].startDate as Date, dates[0].endDate as Date);
  }

  const handleOpen = (i: number): void => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction: string): void => {
    let newSlideNumber: number;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
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
        "Loading..."
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
                {fotoData && fotoData[0] && fotoData[0].photo && (
                  <img
                    // onClick={() => handleOpen(i)}
                    src={fotoData[0].photo || ""}
                    alt=""
                    className="hotel-wrapper__img"
                  />
                )}
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="slider__arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotel-wrapper">
            <button className="hotel-wrapper__book-now" onClick={handleClick}>
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
            <span className="hotel-wrapper__price-highlight">
              Book a stay over ${data?.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotel-wrapper__images">
              {fotoData?.map((photo: PhotoInterface, i: number) => (
                <div className="hotel-wrapper__img-wrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.photo}
                    alt=""
                    className="hotel-wrapper__img"
                  />
                </div>
              ))}
            </div>
            <div className="hotel-wrapper__details">
              <div className="hotel-wrapper__details-texts">
                <h1 className="hotel-wrapper__title">{data?.title}</h1>
                <p className="hotel-wrapper__desc">{data?.description}</p>
              </div>
              <div className="hotel-wrapper__details-price">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>
                    ${days * (data?.cheapestPrice ?? 0) * (options.room ?? 0)}
                  </b>{" "}
                  ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
