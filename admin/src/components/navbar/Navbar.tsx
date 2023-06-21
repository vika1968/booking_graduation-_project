import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { useDispatch } from "react-redux";
import { toggleDarkMode,  darkModeSelector} from "../../features/darkMode/darkModeSlice";
import { useAppSelector } from "../../app/hooks";
import "./navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const darkModeState = useAppSelector(darkModeSelector);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch(toggleDarkMode())}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
