import "./login.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { roomInputs } from "../../formSource";

interface Hotel {
  hotelID?: number;
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  title: string;
  description: string;
  rating?: number;
  cheapestPrice: number;
  featured?: boolean;
}


const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState("");

  const { data, loading, error } = useFetch("/hotels");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room.trim() }));
    try {
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
    } catch (err) {
      console.log(err);
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
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(event: any) => setRooms(event.target.value)}
                  placeholder="Give comma between room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(event: any) => setHotelId(event.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel: Hotel) => (
                        <option key={hotel.hotelID} value={hotel.hotelID}>{hotel.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
