import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import axios from "axios";
import { roomInputs } from "../../../helpers/formSource";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import useFetch from "../../../hooks/useFetch";
import { RoomInterface } from "../../../helpers/roomInterface";
import { HotelInterface } from "../../../helpers/hotelInterface";
import { roomTypesInterface } from "../../../helpers/roomTypesInterface";
import { showToast } from "../../../helpers/toast";
import { ToastContainer } from "react-toastify";
import "./newRoom.scss";

const NewRoom = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL?.replace(/['"`]+/g, '');
  //reduce() method to convert the roomInputs array into an initialInfo object.
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

  const { data, loading, error } = useFetch(`${SERVER_URL}/api/hotels`);
  const {
    data: roomTypesData,
    loading: roomTypesLoading,
    error: roomTypesError,
  } = useFetch("/api/rooms/room-types");

  useEffect(() => {
    const updatedPlaceholders: { [key: string]: string } = {};
    roomInputs.forEach((input) => {
      updatedPlaceholders[input.id] = input.placeholder;
    });
    setPlaceholders(updatedPlaceholders);
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setIsFilled(value !== "");
    setInfo((prevInfo) => ({ ...prevInfo, [id]: value }));
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
      showToast("The 'Price' field must be a number.", "error no redirect", "");
      return;
    }

    if (isNaN(info.maxPeople) || info.maxPeople.toString() === "") {
      showToast(
        "The 'Max People' field must be a number.",
        "error no redirect",
        ""
      );
      return;
    }

    const cleanedRooms = parseInt(rooms.replace(/,/g, ""), 10);
    if (isNaN(cleanedRooms)) {
      showToast(
        "The 'Rooms' must be a comma-separated numbers or single number.",
        "error no redirect",
        ""
      );
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
      showToast("Please fill all fields.", "error no redirect", "");
      return;
    }

    if (rooms.length === 0) {
      showToast("The 'Rooms' field must be chosen.", "error no redirect", "");
      return;
    }

    // A callback function to filter out duplicate room numbers.
    const roomNumbers: unknown | RoomInterface[] = rooms
      .split(",")
      .map((roomNumber: string) => ({
        number: Number(roomNumber),
      }))
      .filter((room, index, self) => {
        return index === self.findIndex((r) => r.number === room.number);
      });

    try {
      if (hotelID === undefined || hotelID === 0) {
        showToast("The 'Hotel' must be chosen.", "error no redirect", "");
        return;
      }

      if (typeID === undefined || typeID === 0) {
        showToast("The 'Room Type' must be chosen.", "error no redirect", "");
        return;
      }

      const { data } = await axios.post(`${SERVER_URL}/api/rooms/${hotelID}`, {
        ...info,
        roomNumbers,
        typeID,
      });

      const { success } = data;

      if (success) {
        showToast(
          "New room(s) successfully added!🎉",
          "success no redirect",
          ""
        );
        handleClear();
      }
    } catch (error: any) {
      showToast(error.response.data.error, "error no redirect", "");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="new">
        <Sidebar />
        <div className="new-container">
          <Navbar />
          <div className="new-container__top">
            <h1 className="new-container__title">Add New Room</h1>
          </div>
          <div className="new-container__bottom">
            <div className="new-container__right">
              <form className="new-container__form">
                {roomInputs.map((input) => (
                  <div className="new-container__form-input" key={input.id}>
                    <label className="new-container__form-input-label">
                      {input.label}
                    </label>
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
                <div className="new-container__form-input">
                  <label className="new-container__form-input-label">
                    Rooms
                  </label>
                  <textarea
                    value={rooms}
                    onChange={(event) => setRooms(event.target.value)}
                    placeholder="Give comma between room numbers or enter single number!"
                    className={isFilled ? "input-filled textarea-color" : "none"}
                  />
                </div>

                <div className="new-container__form-input">
                  <label className="new-container__form-input-label">
                    Choose a hotel
                  </label>
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

                <div className="new-container__form-input">
                  <label className="new-container__form-input-label">
                    Choose a room type
                  </label>
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

                <div className="new-container__form-input">
                  <button
                    className="new-container__form-button"
                    onClick={handleClick}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewRoom;
