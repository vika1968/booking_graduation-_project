import "./new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { UserInterface } from "../../../helpers/userInterface";
import { userInputs } from "../../../helpers/formSource";

interface Input {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
}

interface NewProps {
  inputs: Input[];
  title: string;
}

const New: React.FC<NewProps> = ({ inputs, title }) => {
  //const [file, setFile] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [sendFiles, setSendFiles] = useState<string[]>([]);
  const [info, setInfo] = useState<UserInterface>({} as UserInterface);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let isValid = true;
      inputs.forEach((input) => {
        if (
          (input.id === info.email &&
            (info.email === undefined || info.email.trim() === "")) ||
          (input.id === info.city &&
            (info.city === undefined || info.city.trim() === "")) ||
          (input.id === info.country &&
            (info.country === undefined || info.country.trim() === "")) ||
          (input.id === info.password &&
            (info.password === undefined || info.password.trim() === "")) ||
          (input.id === info.phone &&
            (info.phone === undefined || info.phone.trim() === "")) ||
          (input.id === info.username &&
            (info.username === undefined || info.username.trim() === ""))
        ) {
          isValid = false;
        }
      });

      if (!isValid) {
        alert("Please fill all fields");
        return;
      }

      const newUser = {
        ...info,
        img: selectedFiles,
      };

      const { data } = await axios.post("/api/admin/register", newUser);
      const { success } = data;
      if (success) {
        alert("New admin successfully added");
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
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                selectedFiles.length > 0
                  ? URL.createObjectURL(selectedFiles[0])
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
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
