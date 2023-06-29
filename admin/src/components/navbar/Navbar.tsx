import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useDispatch } from "react-redux";
import { toggleDarkMode} from "../../features/darkMode/darkModeSlice";
import "./navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
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
