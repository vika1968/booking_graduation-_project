
import { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { hotelInputs, roomsType } from "../../../helpers/formSource";
import useFetch from "../../../hooks/useFetch";
import { HotelInterface } from "../../../helpers/hotelInterface";
import "./newHotel.scss";

const NewHotel = () => {
  const initialInfo: HotelInterface = hotelInputs.reduce(
    (accumulator, input) => ({ ...accumulator, [input.id]: "" }),
    { photos: [] } as unknown as HotelInterface
  );

  const [info, setInfo] = useState<HotelInterface>(initialInfo);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [sendFiles, setSendFiles] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [addedHotel, setAddedHotel] = useState(false);
  const [placeholders, setPlaceholders] = useState<{ [key: string]: string }>(
    {}
  );
  const { loading: roomsLoading, data: roomsData, error: roomsError } = useFetch("/api/rooms");


  useEffect(() => {
    const updatedPlaceholders: { [key: string]: string } = {};
    hotelInputs.forEach((input) => {
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
    setSendFiles([]);
    setSelectedFiles([]);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      const fileNames: string[] = Array.from(files).map((file: File) => file.name);
      setSendFiles(fileNames);
      setSelectedFiles(Array.from(files));
    }
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setAddedHotel(false);

      if (isNaN(Number(info.cheapestPrice)) || Number(info.cheapestPrice) === 0) {
        alert("The 'Price' field must be a number.");
        return;
      }

      if (isNaN(Number(info.distance)) || Number(info.distance) === 0) {
        alert("The 'Distance' field must be a number.");
        return;
      }

      if (sendFiles.length === 0) {
        alert("The 'Images' must be chosen.");
        return;
      }

      let isValid = true;
      hotelInputs.forEach((input) => {
        const fieldValue = info[input.id];
        if (
          (typeof fieldValue === "string" && fieldValue.trim() === "") ||
          (typeof fieldValue === "number" && fieldValue === 0)
        ) {
          isValid = false;
        }
      });

      if (!isValid) {
        alert("Please fill all fields");
        return;
      }

      const newHotel = {
        ...info,
        photos: sendFiles,
      };

      const { data } = await axios.post("/api/hotels", { newHotel });
      const { success } = data;
      if (success) {       
        alert("New hotel successfully added");
        handleClear();
  
        // Reset placeholders
        const updatedPlaceholders: { [key: string]: string } = {};
        hotelInputs.forEach((input) => {
          updatedPlaceholders[input.id] = input.placeholder;
        });
        setPlaceholders(updatedPlaceholders);
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
        <div className="newContainer__top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="newContainer__bottom">
          <div className="newContainer__left">
            <img
              src={
                selectedFiles.length > 0
                  ? URL.createObjectURL(selectedFiles[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="newContainer__right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
              </div>

              {hotelInputs.map((input) => (
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
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value="">Select an option</option>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div className="selectRooms">
                <label>Rooms (Information only)</label>
                <select id="rooms" multiple>
                  {roomsLoading ? (
                    <option>Loading</option>
                  ) : (
                    roomsType.map((room) => (
                      <option key={room.id} value={String(room.value)}>
                        {room.value}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <button type="submit" onClick={handleClick}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
