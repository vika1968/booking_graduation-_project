import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { hotelColumns, roomColumns, userColumns } from "./helpers/DataColumns";
import Login from "./app/views/login/Login";
import Home from "./app/views/home/Home";
import Single from "./app/views/single/Single";
import NewUser from "./app/views/newUser/NewUser";
import NewHotel from "./app/views/newHotel/NewHotel";
import NewRoom from "./app/views/newRoom/NewRoom";
import List from "./app/views/list/List";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { adminSelector } from "./features/admin/adminSlice";
import { Admin } from "./features/admin/adminModel";
import { getAdminByCookieMain } from "./features/admin/adminAPI";
import "./style/dark.scss";
import { darkModeSelector } from "./features/darkMode/darkModeSlicve";
import { userInputs } from "./helpers/formSource";

function App() {
  const dispatch = useAppDispatch();
  const admin = useAppSelector(adminSelector) as Admin | null;
  const darkMode = useAppSelector(darkModeSelector);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    console.log(children)
    //   if (!admin) {
    //     return <Navigate to="/login" />;
    //   }

    //   return <>{children}</>;
    // };

    // useEffect(() => {
    //   setTimeout(() => {
    //     dispatch(getAdminByCookieMain());
    //   }, 0);
    // }, []);

    useEffect(() => {
      if (!admin) {
        dispatch(getAdminByCookieMain());
      }
    }, [admin, dispatch]);

    if (!admin) {
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
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
                    <NewUser inputs={userInputs} title="Add New User" />
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
