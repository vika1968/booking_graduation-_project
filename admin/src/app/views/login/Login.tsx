import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      alert("Please enter both email and password."); 
      return;
    }

    if (!validateEmail(credentials.email)) {  
      alert("Please enter a valid email."); 
      return;
    }

    try {
      const { data } = await axios.post("/api/admin/login", { credentials });
      const { success, adminArray } = data;

      if (success) {     
         navigate(`/`)
      }
    } catch (error: any) {
     // console.log(error);    
      alert(error.response.data.error)
    }
  };

  const validateEmail = (email: string) => { 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
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
  );
};

export default Login;
