// import React, { ChangeEvent, useContext, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../../app/hooks";
// import { searchSelector } from "../../features/search/searchSlice";
// import { RoomInterface } from "../../helpers/roomInterface";
// import useFetchClient from "../../hooks/useFetchClient";
// import axios from "axios";
// import "./reserve.scss";
// interface ReserveProps {
//   setOpen: (open: boolean) => void;
//   hotelId: string;
// }

// const Reserve: React.FC<ReserveProps> = ({ setOpen, hotelId }) => {
//   const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

//   console.log(hotelId);

//   const { data, loading, error, reFetch } = useFetchClient<RoomInterface[]>(
//     `/api/hotels/room/${hotelId}`
//   );

//   const dates = useAppSelector(searchSelector);

//   console.log("----data--------");
//   console.log(data);
//   console.log("----data--------");

//   const getDatesInRange = (startDate: string, endDate: string): Date[] => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const date = new Date(start.getTime());

//     const dates: Date[] = [];

//     while (date <= end) {
//       dates.push(new Date(date));
//       date.setDate(date.getDate() + 1);
//     }

//     return dates;
//   };

//   const allDates: Date[] = getDatesInRange(
//     dates?.toString() ?? "",
//     dates?.toString() ?? ""
//   );

//   const isAvailable = (roomNumber: RoomInterface): boolean => {
//     const unavailableDates = roomNumber.flatMap(
//       (room) => room.unavailable_dates
//     );
//     const isFound = unavailableDates.some((date) =>
//       allDates.includes(new Date(date))
//     );
//     return !isFound;
//   };

//   const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
//     const checked = e.target.checked;
//     const value = e.target.value;
//     setSelectedRooms((prevSelectedRooms) =>
//       checked
//         ? [...prevSelectedRooms, value]
//         : prevSelectedRooms.filter((item) => item !== value)
//     );
//   };

//   const navigate = useNavigate();
//   const handleClick = async () => {
//     try {
//       for (const roomId of selectedRooms) {
//         console.log(roomId);
//         console.log(allDates);
//         await axios.put(`/api/rooms/availability/${roomId}`, {
//           dates: allDates,
//         });
//       }
//       setOpen(false);
//       navigate("/");
//     } catch (error: any) {
//       alert(error.response.data.error);
//     }
//   };

//   return (
//     <div className="reserve">
//       <div className="reserve-container">
//         <FontAwesomeIcon
//           icon={faCircleXmark}
//           className="reserve-close"
//           onClick={() => setOpen(false)}
//         />
//         <span className="reserve-title">Select your rooms:</span>
//         {loading ? (
//           <div>Loading...</div>
//         ) : error ? (
//           <div>Error: {error.message}</div>
//         ) : (
//           <>
//             {data &&
//               data.map((item: RoomInterface, i:number) => (
//                 <div className="reserve-item" key={i}>
//                   <div className="reserve-item-info">
//                     <div className="reserve-item-title">{item.title}</div>
//                     <div className="reserve-item-desc">{item.description}</div>
//                     <div className="reserve-item-max">
//                       Max people: <b>{item.maxPeople}</b>
//                     </div>
//                     <div className="reserve-item-price">{item.price}</div>
//                   </div>
//                   <div className="reserve-select-rooms">
//                     <div className="reserve-room" key={i}>                     
//                       <label>room number: {item.Number}</label>                                       
//                       <input
//                         type="checkbox"
//                         value={item.roomId}
//                         onChange={handleSelect}
//                         disabled={!isAvailable(item)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </>
//         )}
//         <button className="reserve-button" onClick={handleClick}>
//           Reserve Now!
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Reserve;

import React, { ChangeEvent, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { searchSelector } from "../../features/search/searchSlice";
import { RoomInterface } from "../../helpers/roomInterface";
import useFetchClient from "../../hooks/useFetchClient";
import axios from "axios";
import "./reserve.scss";

interface ReserveProps {
  setOpen: (open: boolean) => void;
  hotelId: string;
}

const Reserve: React.FC<ReserveProps> = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  //console.log(hotelId);

  const { data, loading, error, reFetch } = useFetchClient<RoomInterface[]>(
    `/api/hotels/room/${hotelId}`
  );

  const searchRedux = useAppSelector(searchSelector);

  console.log("----dates--------");
  console.log(searchRedux?.dates);
  console.log("----dates--------");

  const getDatesInRange = (startDate: string, endDate: string): Date[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    console.log( startDate)
    const date = new Date(start.getTime());

    const dates: Date[] = [];

    while (date <= end) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
 
    return dates;
  };

  const allDates: Date[] = getDatesInRange(
    searchRedux?.dates.toString() ?? "",
    searchRedux?.dates.toString() ?? ""
  );
  
 // console.log( allDates)

  const isAvailable = (roomNumber: RoomInterface): boolean => {
   // console.log(roomNumber)
    const unavailableDates = roomNumber.unavailable_dates as unknown as string[] || []; // Cast to string[] or use an empty array
    const isFound = unavailableDates.some((date) =>
      allDates.includes(new Date(date))
     
    );
    return !isFound;
  };
  

  // const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
  //   const checked = e.target.checked;
  //   const value = e.target.value;
  //   setSelectedRooms((prevSelectedRooms) =>
  //     checked
  //       ? [...prevSelectedRooms, value]
  //       : prevSelectedRooms.filter((item) => item !== value)
  //   );
  // };
    const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;
   
    setSelectedRooms((prevSelectedRooms) =>
      checked
        ? [...prevSelectedRooms, value]
        : prevSelectedRooms.filter((item) => item !== value)
    );   
  };


  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      for (const roomId of selectedRooms) {
        // console.log(roomId);
         console.log(allDates);
        await axios.put(`/api/rooms/availability/${roomId}`, {
          dates: allDates,
        });
      }
      setOpen(false);
      navigate("/");
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="reserve">
      <div className="reserve-container">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="reserve-close"
          onClick={() => setOpen(false)}
        />
        <span className="reserve-title">Select your rooms:</span>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            {data &&
              data.map((item: RoomInterface, i: number) => (
                <div className="reserve-item" key={i}>
                  <div className="reserve-item-info">
                    <div className="reserve-item-title">{item.title}</div>
                    <div className="reserve-item-desc">{item.description}</div>
                    <div className="reserve-item-max">
                      Max people: <b>{item.maxPeople}</b>
                    </div>
                    <div className="reserve-item-price">${item.price} per night</div>
                  </div>
                  <div className="reserve-select-rooms">
                    <div className="reserve-room" key={i}>
                      <label>Room number: {item.Number}</label>
                      <input
                        type="checkbox"
                        value={item.Number}
                        onChange={handleSelect}
                        disabled={!isAvailable(item)}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
        <button className="reserve-button" onClick={handleClick}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;

