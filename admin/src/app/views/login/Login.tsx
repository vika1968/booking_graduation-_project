import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../../helpers/toast";
import { ToastContainer } from "react-toastify";
import { SERVER_URL } from "../../../App";
import "./login.scss";

const Login = () => { 
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {  
      showToast("Please enter both email and password.", "error no redirect", "", navigate);
      return;
    }

    if (!validateEmail(credentials.email)) {  
      showToast("Please enter a valid email.", "error no redirect", "", navigate);
      return;
    }

    try {     
      const { data } = await axios.post(`${SERVER_URL}/api/admin/login`, { credentials }, { withCredentials: true });
      const { success, adminArray, encryptedAdmin } = data;

      if (success) {
        sessionStorage.setItem("adminId", encryptedAdmin); 
        navigate(`/`);
      }
    } catch (error: any) {
      showToast(error.response.data.error, "error no redirect", "", navigate);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <ToastContainer />
      <div className="login">
        <div className="login__container">
          <input
            type="email"
            placeholder="admin email"
            id="email"
            onChange={handleChange}
            className="login__input"
            required
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="login__input"
            required
          />
          <button
            onClick={handleClick}
            className="login__button"
            disabled={!credentials.email || !credentials.password}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
