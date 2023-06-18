import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import axios from "axios";
import { roomInputs } from "../../../helpers/formSource";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import useFetch from "../../../hooks/useFetch";
import { RoomInterface } from "../../../helpers/roomInterface";
import { HotelInterface } from "../../../helpers/hotelInterface";
import { roomTypesInterface } from "../../../helpers/roomTypesInterface";
import "./newRoom.scss";

const NewRoom = () => {
  //метод reduce() для преобразования массива roomInputs в объект initialInfo.
  const initialInfo: RoomInterface = roomInputs.reduce(
    (accumulator, input) => ({ ...accumulator, [input.id]: "" }),
    { hotelID: 0, typeID: 0 } as RoomInterface
  );

  const [info, setInfo] = useState<RoomInterface>(initialInfo);
  const [hotelID, setHotelID] = useState<number>(0);
  const [typeID, setTypeID] = useState<number>(0);
  const [rooms, setRooms] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const [placeholders, setPlaceholders] = useState<{ [key: string]: string }>(
    {}
  );

  const { data, loading, error } = useFetch("/api/hotels");
  const {  data: roomTypesData,    loading: roomTypesLoading,    error: roomTypesError,  } = useFetch("/api/rooms/room-types");

  useEffect(() => {
    const updatedPlaceholders: { [key: string]: string } = {};
    roomInputs.forEach((input) => {
      updatedPlaceholders[input.id] = input.placeholder;
    });
    setPlaceholders(updatedPlaceholders);
  }, []);

  const handleChange = ( event: ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
    const { id, value } = event.target;
    setIsFilled(value !== "");
    setInfo((prevInfo) => ({...prevInfo, [id]: value}));
  };

  const handleClear = () => {
    setInfo(initialInfo);
    setHotelID(0);
    setTypeID(0);
    setRooms("");
  };

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isNaN(info.price) || info.price.toString() === "") {
      alert("The 'Price' field must be a number.");
      return;
    }

    if (isNaN(info.maxPeople) || info.maxPeople.toString() === "") {
      alert("The 'Max People' field must be a number.");
      return;
    }

    const cleanedRooms = parseInt(rooms.replace(/,/g, ""), 10);
    if (isNaN(cleanedRooms)) {
      alert("The 'Rooms' must be a comma-separated numbers or single number.");
      return;
    }

    let isValid = true;

    roomInputs.forEach((input) => {
      if (
        info.description === undefined ||
        info.description.trim() === "" ||
        info.title === undefined ||
        info.title.trim() === ""
      ) {
        isValid = false;
      }
    });

    if (!isValid) {
      alert("Please fill all fields");
      return;
    }

    if (rooms.length === 0) {
      alert("The 'Rooms' field must be chosen.");
      return;
    }

    // A callback function to filter out duplicate room numbers.
    const roomNumbers: unknown | RoomInterface[] = rooms.split(",").map((roomNumber: string) => ({
        number: Number(roomNumber),
      }))
      .filter((room, index, self) => {
        return index === self.findIndex((r) => r.number === room.number);
      });

    try {
      if (hotelID === undefined || hotelID === 0) {
        alert("The 'Hotel' must be chosen.");
        return;
      }

      if (typeID === undefined || typeID === 0) {
        alert("The 'Room Type' must be chosen.");
        return;
      }

      const { data } = await axios.post(`/api/rooms/${hotelID}`, {
        ...info,
        roomNumbers,
        typeID,
      });

      const { success } = data;

      if (success) {
        alert("New hotel room(s) added");
        handleClear();
      }
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={placeholders[input.id]}
                    value={info[input.id] as string}
                    onChange={handleChange}
                    className={isFilled ? "input-filled" : "none"}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  value={rooms}
                  onChange={(event) => setRooms(event.target.value)}
                  placeholder="Give comma between room numbers or enter single number!"
                  className={isFilled ? "input-filled" : "none"}
                />
              </div>

              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  value={hotelID}
                  onChange={(event) => setHotelID(Number(event.target.value))}
                >
                  <option value="">Select the hotel</option>
                  {loading ? (
                    <option>Loading...</option>
                  ) : (
                    data &&
                    data.map((hotel: HotelInterface) => (
                      <option key={hotel.hotelID} value={hotel.hotelID}>
                        {hotel.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="formInput">
                <label>Choose a room type</label>

                <select
                  id="rooms"
                  onChange={(event) => setTypeID(Number(event.target.value))}
                >
                  <option value="">Select the room type</option>
                  {roomTypesLoading ? (
                    <option>Loading</option>
                  ) : (
                    roomTypesData.map((roomType: roomTypesInterface) => (
                      <option key={roomType.typeID} value={roomType.typeID}>
                        {roomType.roomType}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="formInput">
                <button onClick={handleClick}>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
