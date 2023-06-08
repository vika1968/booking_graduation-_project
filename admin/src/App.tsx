import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./Datatablesource";
import Single from "./views/single/Single";
import { userInputs } from "./formSource";
import Login from "./views/login/Login";
import New from "./views/new/New";
import List from "./views/list/List";
import NewHotel from "./views/newHotel/NewHotel";
import NewRoom from "./views/newRoom/NewRoom";
import Home from "./views/home/Home";
 import "./style/dark.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useContext(AuthContext);

    // if (!user) {
    //   return <Navigate to="/login" />;
    // }

    return <>{children}</>;
  };

  const userInputs = [
    { id: "username", label: "Username", type: "text", placeholder: "Enter your username" },
    { id: "password", label: "Password", type: "password", placeholder: "Enter your password" },
  ];

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route   index      element={             <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
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
