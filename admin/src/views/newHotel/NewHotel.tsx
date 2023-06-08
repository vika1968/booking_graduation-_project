import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewHotel = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState<string[]>([]);

  const { data, loading, error } = useFetch("/rooms");

  const handleChange = (e: any) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRooms = Array.from(
      event.target.selectedOptions,
      (option) => (option as HTMLOptionElement).value
    );
    setRooms(selectedRooms);
  };
  
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!files) return;

    try {
      const uploadPromises = Array.from(files).map((file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        return axios.post(
          "https://api.cloudinary.com/v1_1/dr4iesryu/image/upload",
          data
        );
      });

      const uploadResults = await Promise.all(uploadPromises);
      const photoUrls = uploadResults.map((res) => res.data.url);

      const newHotel = {
        ...info,
        rooms,
        photos: photoUrls,
      };

      await axios.post("/hotels", newHotel);
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
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files && files.length > 0
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter title"
                />
              </div>

              <div className="formInput">
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter description"
                />
              </div>

              <div className="formInput">
                <label htmlFor="featured">Featured</label>
                <select
                  id="featured"
                  onChange={(event) =>
                    setInfo((prev) => ({
                      ...prev,
                      featured: event.target.value,
                    }))
                  }
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div className="selectRooms">
                <label htmlFor="rooms">Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "Loading"
                    : data &&
                      data.map((room: any) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
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

export default NewHotel;
