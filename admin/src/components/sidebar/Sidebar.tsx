import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetAdmin } from "../../features/admin/adminSlice";
import { confirmAlert } from 'react-confirm-alert';//npm install react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./sidebar.scss";

const Sidebar = () => {
  const dispatch = useDispatch();

  const logOut = () => {  
    dispatch(resetAdmin()); 
    // Remove data from session storage
    sessionStorage.removeItem("adminId");
    // Clear all data from session storage
    sessionStorage.clear(); 
  };
 
  const confirmationButton = () => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure you want to log out from the admin page? Only admins are allowed.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => logOut()
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
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
          <p className="title">ADMIN</p>
          <li onClick={confirmationButton}>
            <span className="icon">Logout</span>           
          </li>
        </ul>
      </div>
      <div className="bottom">      
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
