import React, { useState } from "react";
import axios from "axios";
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

  const handleUsername = (event: any) => {
    setUsername(event.target.value);
    setSubmitted(false);
  };

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
    setSubmitted(false);
  };

  const handlePassword = (event: any) => {
    setPassword(event.target.value);
    setSubmitted(false);
  };

  const handleCountry = (event: any) => {
    setCountry(event.target.value);
    setSubmitted(false);
  };

  const handleCity = (event: any) => {
    setCity(event.target.value);
    console.log(city)
    setSubmitted(false);
  };

  const handlePhone = (event: any) => {
    setPhone(event.target.value);
    setSubmitted(false);
  };

  
  const handleGoHome=() =>{
    console.log("sadsadasd")
    window.location.assign("/");
  }

  const handleClick = async (event: any) => {
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

      //await axios.post("/auth/register", newUser);
      await axios.post("/api/users/register", newUser);
      setSubmitted(true);
      alert("User created!🎉");
      window.location.assign("/login");
    } catch (err: any) {
      console.log(err);   
      console.log(err.response.data.error);  
      setError(err.response.data.error);
      if (error !=="") {
        alert(error);
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
          <button onClick={handleGoHome} className="register__btn home__btn">
            Go Home
          </button>
        </div>
        {submitted && (
      <div className="submit-success">
        User created successfully!
      </div>
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