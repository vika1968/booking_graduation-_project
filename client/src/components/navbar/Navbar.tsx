import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetUser, userSelector } from "../../features/user/userSlice";
import { getUserBySession } from "../../features/user/userAPI";
import { User } from "../../features/user/userModel";
import "./navbar.scss";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector) as User[] | null;

  useEffect(() => {
    dispatch(getUserBySession());
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!user) {
      navigate("/register");
    }
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const logOut = () => {
    setOpenModal(false);
    // Dispatch the resetUser action
    dispatch(resetUser());   
   // Remove data from session storage
    sessionStorage.removeItem("userId");
    // Clear all data from session storage
    sessionStorage.clear();
    navigate("/");
    document.location.reload();
  };

  const handleOrders = () => {
    setOpenModal(false);   
    navigate("/orders");  
  };

  return (
    <div className="navbar">
      <div className="navbar__navContainer">
        <Link to="/" className="navbar__logo">
          Your Booking place
        </Link>
        {user ? (         
          <>
            <button className="navbar__navButton" onClick={logOut}>
              Log Out <span>{user ? user[0].email : ""}</span>
            </button>
            <button className="navbar__navButton" onClick={handleOrders}>
            {user ? "My Orders" : ""} 
            </button>
          </>
        ) : (
          <div className="navbar__navItems">
            <button className="navbar__navButton" onClick={handleRegister}>
              Register
            </button>
            <button className="navbar__navButton" onClick={handleClick}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
