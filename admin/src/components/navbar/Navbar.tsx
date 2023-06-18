import { useContext } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import "./navbar.scss";
import { DarkModeContext } from "../../context/darkModeContext";
import { useDispatch } from "react-redux";
import { toggleDarkMode, darkModeSelector } from "../../features/darkMode/darkModeSlicve";
import { useAppSelector } from "../../app/hooks";



const Navbar = () => {
  //const { dispatch } = useContext(DarkModeContext);

 const dispatch = useDispatch();
const darkModeState = useAppSelector(darkModeSelector);


  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
             // onClick={() => dispatch({ type: "TOGGLE" })}
             onClick={() => dispatch(toggleDarkMode())}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
