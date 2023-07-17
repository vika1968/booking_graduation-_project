import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../../helpers/toast";
import { SERVER_URL } from "../../../config/config";
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

    if (!credentials.email || !credentials.password) {   
      showToast( "Please enter both email and password.", "error no redirect", "" );
      return;
    }

    if (!validateEmail(credentials.email)) { 
      showToast("Please enter a valid email.", "error no redirect", "");
      return;
    }

    try {
      const { data } = await axios.post(`${SERVER_URL}/api/users/login`, { credentials }, { withCredentials: true });
      const { success, userArray } = data;

      if (success) {
        navigate(`/`, { state: credentials.email });      
      }     
    } catch (error: any) {
      showToast(error.response.data.error, "error no redirect", "");
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return ( 
  <>
    <ToastContainer className="toast-container"/>
    <div className="login-body">
      <div className="login">
        
        <h1 className="login__title">Log in</h1>
        <div className="login__invite">If you are already a <span>registered</span> user,<br/> please enter your details, otherwise proceed to <Link className="login__toregister" to="/register">registration</Link></div>
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
          <button 
            onClick={handleClick} 
            className="login__button"
            disabled={!credentials.email || !credentials.password}
            >
            Login
          </button>        
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
