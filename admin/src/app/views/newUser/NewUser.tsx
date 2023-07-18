import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { UserInterface } from "../../../helpers/userInterface";
import { showToast } from "../../../helpers/toast";
import { ToastContainer } from "react-toastify";
//import { SERVER_URL } from "../../../config/config";
import "./newUser.scss";

interface Input {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

interface NewProps {
  inputs: Input[];
  title: string;
}

const NewUser: React.FC<NewProps> = ({ inputs, title }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL?.replace(/['"`]+/g, '');
  const initialInfo: UserInterface = inputs.reduce(
    (accumulator, input) => ({ ...accumulator, [input.id]: "" }),
    { photos: [] } as unknown as UserInterface
  );

  const [isFilled, setIsFilled] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [sendFiles, setSendFiles] = useState<string[]>([]);
  const [info, setInfo] = useState<UserInterface>(initialInfo);
  const [addedUser, setAddedUser] = useState(false);
  const [placeholders, setPlaceholders] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const updatedPlaceholders: { [key: string]: string } = {};
    inputs.forEach((input) => {
      updatedPlaceholders[input.id] = input.placeholder;
    });
    setPlaceholders(updatedPlaceholders);
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setInfo((prev) => ({ ...prev, [event.target.id]: event.target.value }));
    setIsFilled(value !== "");
  };

  const handleClear = () => {
    setInfo(initialInfo);
    setSendFiles([]);
    setSelectedFiles([]);
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
      setAddedUser(false);
      let isValid = true;
      inputs.forEach((input) => {
        const fieldValue = info[input.id];
        if (
          (typeof fieldValue === "string" && fieldValue.trim() === "") ||
          (typeof fieldValue === "number" && fieldValue === 0)
        ) {
          isValid = false;
        }
      });

      if (!isValid) {
        showToast("Please fill all fields", "error no redirect", "");
        return;
      }

      const newUser = {
        ...info,
        img: selectedFiles,
      };

      const { data } = await axios.post(`${SERVER_URL}/api/admin/register`, newUser, { withCredentials: true });
      const { success } = data;
      if (success) {
        showToast("New admin successfully added!🎉", "success no redirect", "");
        handleClear();

        // Reset placeholders
        const updatedPlaceholders: { [key: string]: string } = {};
        inputs.forEach((input) => {
          updatedPlaceholders[input.id] = input.placeholder;
        });
        setPlaceholders(updatedPlaceholders);
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
        <div className="new__container">
          <Navbar />
          <div className="new__top">
            <h1>{title}</h1>
          </div>
          <div className="new__bottom">
            <div className="new__left">
              <img
                src={
                  selectedFiles.length > 0
                    ? URL.createObjectURL(selectedFiles[0])
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="new__right">
              <form>
                <div className="form-input">
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
                  <div className="form-input" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={placeholders[input.id]}
                      value={info[input.id] as string}
                      onChange={handleChange}
                      className={isFilled ? "input-filled" : "input-placeholder"}                      
                    />
                  </div>
                ))}
                <button onClick={handleClick}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUser;
