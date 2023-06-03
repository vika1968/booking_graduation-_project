import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./components/Movies/Movies";
import HomePage from "./components/HomePage";
import "./App.scss";
import Booking from "./components/Bookings/Booking";
// import Login from "./app/views/login/Login";
import ChangeCredentials from "./app/views/changecredentials/ChangeCredentials";
import MovieListInsertOnce from "./helpers/MovieListInsertOnce";
import OrderResults from "./components/Orders/OrderResults";
// import Home from "./app/views/home/Home";
// import List from "./pages/hotelsList/List";
// import Hotel from "./pages/eachHotel/Hotel";
// import Login from "./pages/login/Login";
import Register from "./app/views/register/Register";
import Hotel from "./app/views/eachHotel/Hotel";
import List from "./app/views/hotelsList/List";
import Login from "./app/views/login/Login";
import Home from "./app/views/home/Home";




// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//         <section>
//           <Routes>
//             <Route path="/" element={<Login />} />
//             {/* Gili, this Route to add movies to DB */}
//             {/* <Route path="/" element={<MovieListInsertOnce/>} /> */}           
//             <Route path="/homepage" element={<HomePage />} />
//             <Route path="/change-credentials/:user" element={<ChangeCredentials />}/>
//             <Route path="/movies" element={<Movies />} />
//             <Route path="/booking/:id" element={<Booking />} />
//             <Route path="/order/:id" element={<OrderResults />} />         
//           </Routes>
//         </section>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
