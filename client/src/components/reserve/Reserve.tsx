import React, { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { searchSelector } from "../../features/search/searchSlice";
import { RoomInterface } from "../../helpers/roomInterface";
import useFetchClient from "../../hooks/useFetchClient";
import axios from "axios";
import { userSelector } from "../../features/user/userSlice";
import { User } from "../../features/user/userModel";
import "./reserve.scss";
interface ReserveProps {
  setOpen: (open: boolean) => void;
  hotelId: string;
}

const Reserve: React.FC<ReserveProps> = ({ setOpen, hotelId }) => {
  const navigate = useNavigate();

  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const { data, loading, error, reFetch } = useFetchClient<RoomInterface[]>(
    `/api/hotels/room/${hotelId}`
  );

  const searchRedux = useAppSelector(searchSelector);
  const user = useAppSelector(userSelector) as User[] | null;

  if (!user) {
    alert ("You are no authorized user.")
    navigate("/register");   
  }
 
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
    searchRedux?.dates[0].startDate.toString() ?? "",
    searchRedux?.dates[0].endDate.toString() ?? ""
  );

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms((prevSelectedRooms) =>
      checked
        ? [...prevSelectedRooms, value]
        : prevSelectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {        
      for (const roomId of selectedRooms) {
        await axios.put(`/api/rooms/availability/${roomId}`, {
          user: user ? user[0].userID : null, dates: allDates,         
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
        {loading ? 
        (
          <div>Loading...</div>
        ) : error ? (
          <div> {'Unfortunately, this is a new hotel and the administrator has not yet entered the information about the rooms.'}</div>
        ) : 
        (
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
                    <div className="reserve-item-price">
                      ${item.price} per night
                    </div>
                  </div>
                  <div className="reserve-select-rooms">
                    <div className="reserve-room" key={i}>
                      <label>Room number: {item.Number}</label>
                      <input
                        type="checkbox"
                        value={item.Number}
                        onChange={handleSelect}                     
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
