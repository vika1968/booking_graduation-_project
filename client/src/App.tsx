import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./app/views/register/Register";
import Hotel from "./app/views/eachHotel/Hotel";
import List from "./app/views/hotelsList/List";
import Login from "./app/views/login/Login";
import Home from "./app/views/home/Home";
import OrderResults from "./app/views/orders/OrderResults";
import Page404 from "./app/views/page404/Page404";
import { disableReactDevTools } from "@fvilers/disable-react-devtools"
import "./App.scss";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL?.replace(/['"`]+/g, '');
const environment = process.env.REACT_APP_API_ENVIRONMENT;

if (environment === "PROD"){
  disableReactDevTools(); 
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/orders" element={<OrderResults/>}/>
      </Routes>
    </BrowserRouter>
  );
  }


export default App;
