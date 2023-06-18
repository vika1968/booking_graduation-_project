import { Link } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";
import "./sidebar.scss";
// import { DarkModeContext } from "../../context/darkModeContext";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { darkModeSelector, toggleDarkMode } from "../../features/darkMode/darkModeSlicve";
import { resetAdmin } from "../../features/admin/adminSlice";

const Sidebar = () => {
 /// const { dispatch } = useContext(DarkModeContext);

 const dispatch = useDispatch();
const darkModeState = useAppSelector(darkModeSelector);

  const logOut = () => {
   // localStorage.removeItem("user");
   // document.location.reload();
   dispatch(resetAdmin());
  };

  const confirmationButton = () => {
    const answer = window.confirm(
      "Are you sure you want to log out from the admin page? Only admins are allowed."
    );
    if (answer) {
      logOut();
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Your Booking Place</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <span className="icon">Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <span className="icon">Users</span>
            </li>
          </Link>
          <Link to="/hotels" style={{ textDecoration: "none" }}>
            <li>
              <span className="icon">Hotels</span>
            </li>
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none" }}>
            <li>
              <span className="icon">Rooms</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li onClick={confirmationButton}>
            <span className="icon">Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
        //  onClick={() => dispatch({ type: "LIGHT" })}
        onClick={() => dispatch({ type: "LIGHT" })}
 
        ></div>
        <div
          className="colorOption"
        //  onClick={() => dispatch({ type: "DARK" })}
        onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;

