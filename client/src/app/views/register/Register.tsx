import  { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify"; //npm install react-toastify
import "react-toastify/dist/ReactToastify.css";
import "./register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setSubmitted(false);
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setSubmitted(false);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setSubmitted(false);
  };

  const handleCountry = (event: ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
    setSubmitted(false);
  };

  const handleCity = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value); 
    setSubmitted(false);
  };

  const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
    setSubmitted(false);
  };

  const handleGoHome = () => {  
    window.location.assign("/");
  };

  const handleClick = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const newUser = {
        username,
        email,
        password,
        country,
        city,
        phone,
      };

      await axios.post("/api/users/register", newUser);
      setSubmitted(true);   
      toast.success("User created!🎉", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "custom-toast",  
        onClose: async () => {
          await new Promise((resolve) => setTimeout(resolve, 3000)); 
          window.location.assign("/login");
        },
      });
    
    } catch (err: any) {    
      setError(err.response.data.error);
      if (error !== "") {      
        toast.error(error, {        
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "custom-toast"
        });
      }
    }
  };

  return (
    <div className="regBody">
      <div className="register">
        <h1 className="register__title">Register</h1>
        <div className="register__inputs">
          <input
            onChange={handleUsername}
            className="register__input"
            type="text"
            id="username"
            placeholder="User Name"
          />
          <input
            onChange={handleEmail}
            type="email"
            id="email"
            className="register__input"
            placeholder="Email"
          />
          <input
            onChange={handlePassword}
            className="register__input"
            type="password"
            id="password"
            placeholder="Password"
          />
          <input
            onChange={handleCountry}
            className="register__input"
            type="text"
            id="country"
            placeholder="Country"
          />
          <input
            onChange={handleCity}
            className="register__input"
            type="text"
            id="city"
            placeholder="City"
          />
          <input
            onChange={handlePhone}
            className="register__input"
            type="text"
            id="phone"
            placeholder="+1 234 567 89"
          />
        </div>
        <div className="register__footer">
          <button onClick={handleClick} type="submit" className="register__btn">
            Register
          </button>
          <ToastContainer className="toast-container" />
          <button onClick={handleGoHome} className="register__btn home__btn">
            Go Home
          </button>
        </div>
        {submitted && (
          <div className="submit-success">User created successfully!</div>
        )}

        {error && (
          <div className="submit-error">
            Error occurred. Please fill in all the fields.
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
