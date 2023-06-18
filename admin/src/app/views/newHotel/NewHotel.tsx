// import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import axios from "axios";
// import "../newHotel/newHotel.scss";
// import Navbar from "../../../components/navbar/Navbar";
// import Sidebar from "../../../components/sidebar/Sidebar";
// import { hotelInputs, roomsType } from "../../../helpers/formSource";
// import useFetch from "../../../hooks/useFetch";
// import { HotelInterface } from "../../../helpers/hotelInterface";

// const NewHotel = () => {
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   // const [files, setFiles] = useState<File[]>([]);
//   const [sendFiles, setSendFiles] = useState<string[]>([]);
//   const [info, setInfo] = useState<HotelInterface>({} as HotelInterface);
//   // const [rooms, setRooms] = useState<string[]>([]); //rooms gonna be room's id
//   const [featured, setfeatured] = useState(false);
//   const [isFilled, setIsFilled] = useState(false);
//   // const [placeholders, setPlaceholders] = useState<string[]>([]);
//   const [addedHotel, setAddedHotel] = useState(false);
//   const {loading: roomsLoading, data: roomsData, error: roomsError} = useFetch("/rooms");

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const inputValue = e.target.value;
//     setIsFilled(inputValue !== "");

//     const selectId = e.target.id;

//     if (selectId === "featured") {
//       setfeatured(Boolean(e.target.value));
//     }

//     const { id, value } = e.target;
//     setInfo((prev) => ({ ...prev, [id]: value }));
//   };

//   // const handleSelectRoom = (e: ChangeEvent<HTMLSelectElement>) => {
//   //   const selectedOptions = Array.from(
//   //     e.target.selectedOptions,
//   //     (option) => option.value
//   //   );
//   //   setRooms(selectedOptions);
//   // };

//   const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
//     const files = e.target.files;
//     if (files) {
//       const fileNames: string[] = Array.from(files).map(
//         (file: File) => file.name
//       );
//       setSendFiles(fileNames); // to send file

//       const fileArray: File[] = Array.from(files); // to show file
//       setSelectedFiles(fileArray);
//     }
//   };

//   const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     try {
//       setAddedHotel(false);
//       if (isNaN(info.cheapestPrice)) {
//         alert("The 'Price' field must be a number.");
//         return;
//       }

//       if (
//         info.distance === undefined ||
//         isNaN(Number(info.distance)) ||
//         Number(info.distance) === 0
//       ) {
//         alert("The 'Distance' field must be a number.");
//         return;
//       }

//       // if (rooms.length === 0) {
//       //   alert("The 'Rooms' field must choosed.");
//       //   return;
//       // }

//       if (sendFiles.length === 0) {
//         alert("The 'Images' must choosed.");
//         return;
//       }


    
      
//       let isValid = true;
//       hotelInputs.forEach((input) => {
       
//         if (
//           (info.name === undefined || info.name.trim() === "") ||
//           (info.type === undefined || info.type.trim() === "") ||
//           (info.city === undefined || info.city.trim() === "") ||
//           (info.address === undefined || info.address.trim() === "") ||         
//           (info.title === undefined || info.title.trim() === "") ||
//           (info.description === undefined || info.description.trim() === "") 
//         )
//          {  isValid = false;}
        
       
//       });

//       if (!isValid) {
//         alert("Please fill all fields");
//         return;
//       }

//       const newHotel = {
//         ...info,
//         featured,
//         // rooms,       
//         photos: sendFiles,
//       };

//       const { data } = await axios.post("/api/hotels", { newHotel });
//       const { success } = data;

//       if (success) {
//         setAddedHotel(true);

//         alert("New hotel successfully added");

//        // console.log(addedHotel);
//       }
//     } catch (error: any) {
//       console.error(error.response.data.error);
//     }
//   };
//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="newContainer__top">
//           <h1>Add New Product</h1>
//         </div>
//         <div className="newContainer__bottom">
//           <div className="newContainer__left">
//             <img
//               src={
//                 selectedFiles.length > 0
//                   ? URL.createObjectURL(selectedFiles[0])
//                   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//               }
//               alt=""
//             />
//           </div>
//           <div className="newContainer__right">
//             <form>
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="file"
//                   multiple
//                   onChange={handleFileSelect}
//                   style={{ display: "none" }}
//                 />
//               </div>

//               {hotelInputs.map((input) => (
//                 <div className="formInput" key={input.id}>
//                   <label>{input.label}</label>
//                   <input
//                     id={input.id}
//                     onChange={handleChange}
//                     type={input.type}
//                     placeholder={addedHotel ? "" : input.placeholder}
//                     className={isFilled ? "input-filled" : "input-placeholder"}
//                   />
//                 </div>
//               ))}

//               <div className="formInput">
//                 <label>Featured</label>
//                 <select id="featured" onChange={handleChange}>
//                   <option value="">Select an option</option>
//                   <option value="false">No</option>
//                   <option value="true">Yes</option>
//                 </select>
//               </div>

//               <div className="selectRooms">
//                 <label>Rooms ( Information only )</label>
//                 <select id="rooms" multiple
//                 //  onChange={handleSelectRoom}
//                  >
//                   {roomsLoading ? (
//                     <option>Loading</option>
//                   ) : (
//                     roomsType.map((room) => (
//                       <option key={room.id} value={String(room.value)}>
//                         {room.value}
//                       </option>
//                     ))
//                   )}
//                 </select>
//               </div>

//               <button type="submit" onClick={handleClick}>
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewHotel;
import { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import "../newHotel/newHotel.scss";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { hotelInputs, roomsType } from "../../../helpers/formSource";
import useFetch from "../../../hooks/useFetch";
import { HotelInterface } from "../../../helpers/hotelInterface";

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
