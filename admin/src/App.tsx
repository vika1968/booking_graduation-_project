import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { hotelColumns, roomColumns, userColumns } from "./helpers/DataColumns";
import Login from "./app/views/login/Login";
import Home from "./app/views/home/Home";
import Single from "./app/views/single/Single";
import NewUser from "./app/views/newUser/NewUser";
import NewHotel from "./app/views/newHotel/NewHotel";
import NewRoom from "./app/views/newRoom/NewRoom";
import List from "./app/views/list/List";
import { useAppSelector } from "./app/hooks";
import { darkModeSelector } from "./features/darkMode/darkModeSlice";
import { userInputs } from "./helpers/formSource";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Page404 from "./app/views/page404/Page404";
import { disableReactDevTools } from "@fvilers/disable-react-devtools"//npm i @fvilers/disable-react-devtools
import { environment } from "./config/config";
import "./style/dark.scss";

//Dlya deploy - deaktivaziya  react dev tools
//npm i @fvilers/disable-react-devtools  - ustanovim

// let environment = 'PROD'//"DEV"; menyaetm po neobxodimosti na "PROD"
// let SERVER_API_URL: string; 

// // environment === "DEV" ? BACKEND_URL = SERVER_URL : BACKEND_URL = ""
// // environment === "DEV" ? null : disableReactDevTools()
// if (environment === "DEV") {
//   SERVER_API_URL = LOCAL_SERVER_URL;
// } else {
//   SERVER_API_URL = SERVER_URL;//"https://moovi-booking-back.onrender.com";// suda podstavili
//   disableReactDevTools(); 
// }

if (environment === "PROD"){
  disableReactDevTools(); 
}


function App() {
  const darkMode = useAppSelector(darkModeSelector);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route index element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />             
              <Route
                path=":single" element={
                  <ProtectedRoute>
                   <Single />
                  </ProtectedRoute>
                }
              />
              <Route path="new" element={
                  <ProtectedRoute>
                    <NewUser inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route index element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route path=":productId" element={
                 <ProtectedRoute>
                    <Single />
                 </ProtectedRoute>
                }
              />                          
              <Route path="new" element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms"> <Route index element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />           
              <Route path="new" element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
