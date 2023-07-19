import { ChangeEvent, FormEvent, useState } from "react";
import { ToastContainer } from "react-toastify"; //npm install react-toastify
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../../helpers/toast";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.scss";

const Register = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL?.replace(/['"`]+/g, "");
  const navigate = useNavigate();
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

      await axios.post(`${SERVER_URL}/api/users/register`, newUser,{ withCredentials: true });
    
      setSubmitted(true);
      showToast("User created!🎉", "success redirect", "/login", navigate );
    } catch (err: any) {
      setError(err.response.data.error);
      showToast(err.response.data.error, "error no redirect", "", navigate );
    }
  };

  return (
    <div className="regBody">
      <div className="register">
        <h1 className="register__title">Register</h1>
        <div className="register__msg">
          If you are already registered. go to{" "}
          <Link className="register__tologin" to="/login">
            login
          </Link>{" "}
          tab.{" "}
        </div>
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
