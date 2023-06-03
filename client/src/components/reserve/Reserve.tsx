import React, { ChangeEvent, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.scss";
// import useFetch from "../../hooks/useFetch";
// import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";

interface Room {
  roomId: number;
  title: string;
  description: string;
  maxPeople: number;
  price: number;
  roomNumbers: {
    roomId: number;
    number: number;
    unavailableDates: Date[];
  }[];
}

interface ReserveProps {
  setOpen: (open: boolean) => void;
  hotelId: string;
}

const Reserve: React.FC<ReserveProps> = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const { data, loading, error, reFetch } = useFetch<Room[]>(
    `/hotels/room/${hotelId}`
  );
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate: string, endDate: string): Date[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates: Date[] = [];

    while (date <= end) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const allDates: Date[] = getDatesInRange(
    dates[0]?.toString() ?? "",
    dates[1]?.toString() ?? ""
  );

  const isAvailable = (roomNumber: Room["roomNumbers"][0]): boolean => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date))
    );

    return !isFound;
  };

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
      await Promise.all(
        selectedRooms.map((roomId) =>
          axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          })
        )
      );
      setOpen(false);
      navigate("/");
    } catch (err) {
      // Handle error
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
            {data.map((item: Room[]) => (
              <div className="reserve-item" key={item[0].roomId}>
                <div className="reserve-item-info">
                  <div className="reserve-item-title">{item[0].title}</div>
                  <div className="reserve-item-desc">{item[0].description}</div>
                  <div className="reserve-item-max">
                    Max people: <b>{item[0].maxPeople}</b>
                  </div>
                  <div className="reserve-item-price">{item[0].price}</div>
                </div>
                <div className="reserve-select-rooms">
                  {item[0].roomNumbers.map((roomNumber) => (
                    <div className="reserve-room" key={roomNumber.roomId}>
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber.roomId}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
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
