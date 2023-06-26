import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/users/login", { credentials });
      const { success, userArray } = data;

      if (success) {
        navigate(`/`, { state: credentials.email });      
      }     
    } catch (error: any) {
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "custom-toast",
      });
    }
  };

  return (
    <div className="logBody">
      <div className="login">
        <h1 className="login__title">Log in</h1>
        <div className="login__container">
          <input
            type="text"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="login__input"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="login__input"
          />
          <button onClick={handleClick} className="login__button">
            Login
          </button>
          <ToastContainer className="toast-container" />
        </div>
      </div>
    </div>
  );
};

export default Login;
