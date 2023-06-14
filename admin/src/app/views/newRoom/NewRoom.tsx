import "./newRoom.scss";
import { useState } from "react";
import axios from "axios";
import { roomInputs } from "../../../helpers/formSource";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import useFetch from "../../../hooks/useFetch";
import { RoomInterface } from "../../../helpers/roomInterface";
import { HotelInterface } from "../../../helpers/hotelInterface";

interface Room {
  title: string;
  price: number;
  maxPeople: number;
  description: string;
  hotelID: number;
}

const NewRoom = () => {
  const [info, setInfo] = useState<Room>({} as Room);
  const [hotelID, setHotelID] = useState<number | undefined>(undefined);
  const [hotelName, setHotelName] = useState<string | undefined>(undefined);
  const [rooms, setRooms] = useState("");

  const { data, loading, error } = useFetch("/api/hotels");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  //  const  handleGetHotelByName = async  (hotelName: string) =>{

  //   console.log('hotelName')
  //   const { data } = await axios.get(`/api/hotels/find/${hotelName}`)  
  //   const { choosedID } = data;

  //   console.log(choosedID)
  // }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
 

    if (isNaN(info.price)) {
      alert("The 'Price' field must be a number.");
      return;
    }

    if (isNaN(info.maxPeople)) {
      alert("The 'Max People' field must be a number.");
      return;
    }

    const cleanedRooms = parseInt(rooms.replace(/,/g, ''), 10);
    if (isNaN(cleanedRooms)) {
      alert("The room numbers must be comma-separated integers.");
      return;
    }

    let isValid = true;

    // roomInputs.forEach((input) => {
    //  if (
    //       (input.id === info.description && 
    //         (info.description === undefined || info.description.trim() === "")) ||
    //       (input.id === info.title && (info.title === undefined || info.title.trim() === ""))  ||
    //       (input.id === info.maxPeople.toString() && info.maxPeople === undefined) ||
    //       (input.id === info.price.toString() && info.price === undefined) 
    //         ) {
    //           isValid = false;
    //         }
    //       });


    roomInputs.forEach((input) => {
      if (
     
           (info.description === undefined || info.description.trim() === "")||
        // (input.id === info.title &&
           (info.title === undefined || info.title.trim() === "")    
        // (input.id === info.maxPeople.toString() && info.maxPeople === undefined) || 
       // (input.id === info.price.toString() && info.price === undefined) 
      ) {
        isValid = false;
      }
    });

    
          if (!isValid) {
            alert("Please fill all fields");
            return;
          }
          console.log (info.title)
          console.log (info.description)


      if (rooms.length === 0) {
        alert("The 'Rooms' field must choosed.");
        return;
      }

   
    const roomNumbers = rooms
      .split(",")
      .map((roomNumber: string) => ({
        number: Number(roomNumber),
      })) as unknown as RoomInterface[];
    try {

     // console.log(roomNumbers)       

      console.log(hotelID)
      if (hotelID === undefined || hotelID === 0){
        alert("The 'Hotel' must choosed.");
        return;
      }
      console.log( { ...info, roomNumbers })

    //  await axios.post(`/api/rooms/${hotelID}`, { ...info, roomNumbers });
    const { data } = await axios.post(`/api/rooms/${hotelID}`, { ...info, roomNumbers });
    const { success } = data;

    if (success) {
    //  setAddedHotel(true);

      alert("New hotel room/s added");
     // console.log(addedHotel);
    }

    } catch (error: any) {
      console.error(error.response.data.error);
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
                  onChange={(event) => setRooms(event.target.value)}
                  placeholder="Give comma between room numbers!!!!."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
              <select
                  id="hotelId"
                  value={hotelID}
                  onChange={(event) => setHotelID(Number(event.target.value))}
                 //onChange={(event) => handleGetHotelByName('hotelID')}
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
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
