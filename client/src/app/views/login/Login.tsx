import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { AuthContext } from "../../../context/AuthContext";
import { useDispatch } from "react-redux";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  //const { loading, error, dispatch } = useContext(AuthContext);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  //  dispatch({ type: "LOGIN_START" });
    try {
     // const res = await axios.post("/auth/login", credentials);
     console.log(credentials)
     const { data } = await axios.post("/api/users/login", { credentials });
     const { success, userArray } = data;
   //   dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
   
   if (success) {  
    navigate(`/`, { state: credentials.email });
  }
     // navigate("/");
    } catch (err: any) {
   //   dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
   console.log(err)
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
          {/* <button disabled={loading} onClick={handleClick} className="login__button"> */}
          <button onClick={handleClick} className="login__button">
            Login
          </button>
          {/* {error && <span>{typeof error === 'string' ? error : error.message}</span>} */}
        </div>
      </div>
    </div>
  );
};

export default Login;
