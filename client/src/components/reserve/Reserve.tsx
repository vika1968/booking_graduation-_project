import React, { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { searchSelector } from "../../features/search/searchSlice";
import { RoomInterface } from "../../helpers/roomInterface";
import useFetchClient from "../../hooks/useFetchClient";
import { userSelector } from "../../features/user/userSlice";
import { User } from "../../features/user/userModel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../helpers/toast";
import axios from "axios";
import "./reserve.scss";

interface ReserveProps {
  setOpen: (open: boolean) => void;
  hotelId: string;
}

const Reserve: React.FC<ReserveProps> = ({ setOpen, hotelId }) => {
  const [roomID, setRoomID] = useState<number>(0)
  const navigate = useNavigate();

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const currentDateStr = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });  

  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const { data, loading, error, reFetch } = useFetchClient<RoomInterface[]>(
    `/api/hotels/room/${hotelId}`   
  ); 

  const searchRedux = useAppSelector(searchSelector);
  const user = useAppSelector(userSelector) as User[] | null;

  const getDatesInRange = (startDate: string, endDate: string): Date[] => {    
    const parseDate = (dateString: string): Date => {
      const [datePart, timePart] = dateString.split(" ");
      const [day, month, year] = datePart.split("/");
      const [hours, minutes, seconds] = timePart.split(":");

      const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      return new Date(formattedDateString);
    }; 

    const start = parseDate(startDate);
    const end = parseDate(endDate);

    const dates: Date[] = [];
    dates.push(start);
    dates.push(end);
    return dates;
  };

  const allDates: Date[] = getDatesInRange(
    searchRedux?.dates[0].startDate.toString() ?? currentDateStr,
    searchRedux?.dates[0].endDate.toString() ?? currentDateStr
  );

  const handleSelect = (e: ChangeEvent<HTMLInputElement>,chosedroomID: number) => {
    setRoomID(chosedroomID)
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms((prevSelectedRooms) =>
      checked
        ? [...prevSelectedRooms, value]
        : prevSelectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    if (!searchRedux?.dates[0].startDate || !searchRedux?.dates[0].endDate) {
      showToast(
        "Please enter your reservation dates again.",
        "error redirect",
        "/"
      );
      return;
    }

    const startDateStr = searchRedux?.dates[0].startDate;
    const endDateStr = searchRedux?.dates[0].endDate;
    
    if (startDateStr && endDateStr) {
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);
    
      if (
        startDate.getDate() === endDate.getDate() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getFullYear() === endDate.getFullYear()
      ) {
      showToast(
        "Please enter your reservation dates again. Your Start Date and End Date look like the same.",
        "error redirect",
        "/"
      );
      return;
     }
    }

    if (selectedRooms.length === 0) {
      showToast("Please select at least one room.", "error no redirect", "");
      return;
    }

    try {
      for (const roomNumber of selectedRooms) {     
         await axios.put(`/api/rooms/availability/${roomNumber}`, {
          user: user ? user[0].userID : null,
          dates: allDates,
          hotelId,             
        });
      }
      showToast(
        "Your reservation ended successfully.!🎉",
        "success redirect",
        "/"
      );
      //setOpen(false);
    } catch (error: any) {
      // showToast(error.response.data.error, "error redirect", "/");
      showToast(error.response.data.error, "error no redirect", "");
     // setOpen(false);
    }
  };

  const isButtonDisabled = selectedRooms.length === 0;

  return (
    <>
      <ToastContainer />
      <div className="reserve">
        <div className="reserve__container">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="reserve__close"
            onClick={() => setOpen(false)}
          />
          <span className="reserve__title">Select your rooms:</span>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>
              {" "}
              {
                "Unfortunately, this is a new hotel and the administrator has not yet entered the information about the rooms."
              }
            </div>
          ) : (
            <>
              {data &&
                data.map((item: RoomInterface, i: number) => (
                  <div className="reserve__item" key={i}>
                    <div className="reserve__item-info">
                      <div className="reserve__item-title">{item.title}</div>
                      <div className="reserve__item-desc">
                        {item.description}
                      </div>
                      <div className="reserve__item-max">
                        Max people: <b>{item.maxPeople}</b>
                      </div>
                      <div className="reserve__item-price">
                        ${item.price} per night
                      </div>
                    </div>
                    <div className="reserve__select-rooms">
                      <div className="reserve__room" key={i}>
                        <label className="reserve__room-label">
                          Room number: {item.Number}                         
                        </label>
                        <input
                          className="reserve__room-checkbox"
                          type="checkbox"
                          value={item.Number}
                          onChange={(e) => handleSelect(e, item.roomId)} 
                      />
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
          <button
            className="reserve__button"
            onClick={handleClick}
            disabled={isButtonDisabled}
          >
            Reserve Now!
          </button>

          {isButtonDisabled && (
            <div className="reserve__message">
              Please select at least one room.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reserve;
