import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import "../newHotel/newHotel.scss";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { hotelInputs, roomsType } from "../../../helpers/formSource";
import useFetch from "../../../hooks/useFetch";

import { HotelInterface } from "../../../helpers/hotelInterface";

// interface Room {
//   roomId: number;
//   title: string;
//   price: number;
//   maxPeople: number;
//   description: string;
//   roomNumbers: number;
// }

interface Hotel {
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  title: string;
  description: string;
  rating: number;
  cheapestPrice: number;
  featured: boolean;
}

const NewHotel = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // const [files, setFiles] = useState<File[]>([]);
  const [sendFiles, setSendFiles] = useState<string[]>([]);
  const [info, setInfo] = useState<Hotel>({} as Hotel);
  const [rooms, setRooms] = useState<string[]>([]); //rooms gonna be room's id
  const [featured, setfeatured] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [addedHotel, setAddedHotel] = useState(false);
  const {
    loading: roomsLoading,
    data: roomsData,
    error: roomsError,
  } = useFetch("/rooms");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const inputValue = e.target.value;
    setIsFilled(inputValue !== "");

    const selectId = e.target.id;

    if (selectId === "featured") {
      setfeatured(Boolean(e.target.value));
    }

    const { id, value } = e.target;
    setInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectRoom = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(selectedOptions);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      const fileNames: string[] = Array.from(files).map(
        (file: File) => file.name
      );
      setSendFiles(fileNames); // to send file

      const fileArray: File[] = Array.from(files); // to show file
      setSelectedFiles(fileArray);
    }
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setAddedHotel(false);
      if (isNaN(info.cheapestPrice)) {
        alert("The 'Price' field must be a number.");
        return;
      }

      if (
        info.distance === undefined ||
        isNaN(Number(info.distance)) ||
        Number(info.distance) === 0
      ) {
        alert("The 'Distance' field must be a number.");
        return;
      }

      if (rooms.length === 0) {
        alert("The 'Rooms' field must choosed.");
        return;
      }

      if (sendFiles.length === 0) {
        alert("The 'Images' must choosed.");
        return;
      }

      let isValid = true;
      hotelInputs.forEach((input) => {
        if (
          (input.id === info.name &&
            (info.name === undefined || info.name.trim() === "")) ||
          (input.id === info.type &&
            (info.type === undefined || info.type.trim() === "")) ||
          (input.id === info.city &&
            (info.city === undefined || info.city.trim() === "")) ||
          (input.id === info.address &&
            (info.address === undefined || info.address.trim() === "")) ||
          (input.id === info.distance &&
            (info.distance === undefined || info.distance.trim() === "")) ||
          (input.id === info.title && info.title === undefined) ||
          (input.id === info.description && info.description === undefined) ||
          (input.id === info.cheapestPrice.toString() && info.cheapestPrice === undefined)
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
        featured,
        rooms,
        // photos: files,
        photos: sendFiles,
      };

      const { data } = await axios.post("/api/hotels", { newHotel });
      const { success } = data;

      if (success) {
        setAddedHotel(true);

        alert("New hotel successfully added");

        console.log(addedHotel);
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
        <div className="newContainer__top">
          <h1>Add New Product</h1>
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
                    onChange={handleChange}
                    type={input.type}
                    placeholder={addedHotel ? "" : input.placeholder}
                    className={isFilled ? "input-filled" : "input-placeholder"}
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
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelectRoom}>
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
