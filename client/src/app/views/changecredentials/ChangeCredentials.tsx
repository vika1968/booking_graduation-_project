import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ChangeCredentials = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useParams();
  const navigate = useNavigate();

  const handleGetUserByID = async () => {
    try {
      const { data } = await axios.get(`/api/user/${user}`);  

      if (!data) {
        alert("No valid user");
        navigate(`/`);
      }
    } catch (error: any) {
      console.error(error.response.data.error);
    }
  };

  useEffect(() => {
    handleGetUserByID();
  }, []);

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault();

      if (!email) {
        alert("Please fill in the username field!");
        return;
      }

      if (!password) {
        alert("Please fill in the password field!");
        return;
      }

      const newEmail = email;
     
      if (!newEmail) {
        alert(
          "You didn't enter an email value, so your email will remain unchanged."
        );
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
          alert("Invalid email format. Please enter a valid email address.");
        }
      }
      const newPassword = password;

      if (!newPassword) {
        alert(
          "You didn't enter a password value, so your password will remain unchanged."
        );
      } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(newPassword)) {
          alert(
            "Invalid password format. Please enter a password with at least 6 characters, including at least one lowercase letter, one uppercase letter, and one numeric digit."
          );
        }
      }

      const response = await axios.put(`/api/user/update-user`, {
        email: newEmail,
        password: newPassword,
        id: user,
      });
      if (response.data.userArray.affectedRows !== 1) {
        alert("Something went wrong. Please check your data.");
      } else {
        alert("Your permission has been changed.");     
           navigate("/homepage");    
      }
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="change-credentials">
      <h4 className="change-credentials__title">change credentials</h4>

      <form className="change-credentials__form" onSubmit={handleSubmit}>
        <div className="change-credentials__input-group">
          <label className="change-credentials__label" htmlFor="email">
            username:
          </label>
          <input
            type="email"
            id="email"
            onInput={(event: any) => {
              setEmail(event.target.value);
            }}
            className="change-credentials__input"
            placeholder="Enter your new email here ..."
            required
          />
        </div>

        <div className="change-credentials__input-group">
          <label className="change-credentials__label" htmlFor="password">
            password:
          </label>
          <input
            type="password"
            id="password"
            onInput={(event: any) => {
              setPassword(event.target.value);
            }}
            className="change-credentials__input"
            placeholder="Enter your new password here ..."
            required
          />
        </div>
        <button type="submit" className="change-credentials__submit-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default ChangeCredentials;
