import "./navbar.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetUser, userSelector } from "../../features/user/userSlice";
import { User } from "../../features/user/userModel";
import { getUserByCookieMain } from "../../features/user/userAPI";
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
// interface User {
//   // Define the properties of your user object
// }

const Navbar = () => {
 // const { user } = useContext(AuthContext);
 const dispatch = useAppDispatch();
 const user = useAppSelector(userSelector) as User[] | null;
//  const [emailInStore, setEmailInStore] = useState<string | null>(null);
 const location = useLocation();
//  const email = location.state?.email || "";

 useEffect(() => {
  dispatch(getUserByCookieMain());  
}, []);

// useEffect(() => {
//   if (user !== null) {
//     setEmailInStore(user[0].email);
//   } else {
//     setEmailInStore(email);
//   }
// }, [user]);


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
       Cookies.remove('userId');
       navigate("/");
     document.location.reload();
  };

  return (
    <div className="navbar">
      <div className="navbar__navContainer">
        <Link to="/" className="navbar__logo">
          Your Booking place
        </Link>
        {user ? (
          <button className="navbar__navButton" onClick={logOut}>
            Log Out
          </button>
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
