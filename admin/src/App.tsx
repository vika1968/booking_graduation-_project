// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { DarkModeContext } from "./context/darkModeContext";

// import { AuthContext } from "./context/AuthContext";
// import { hotelColumns, roomColumns, userColumns } from "./Datatablesource";
// import Login from "./app/views/login/Login";
// import Home from "./app/views/home/Home";
// import Single from "./app/views/single/Single";
// import New from "./app/views/new/New";
// import NewHotel from "./app/views/newHotel/NewHotel";
// import NewRoom from "./app/views/newRoom/NewRoom";
// import List from "./app/views/list/List";
// import { useAppDispatch, useAppSelector } from "./app/hooks";
// import { adminSelector } from "./features/admin/adminSlice";
// import { Admin } from "./features/admin/adminModel";
// import { getAdminByCookieMain } from "./features/admin/adminAPI";
// import "./style/dark.scss";

// //  function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/login" element={<Login/>}/>
// //         <Route   index    element={  <Home />
// //               }
// //             />
// //         {/* <Route path="/hotels" element={<List/>}/>
// //         <Route path="/hotels/:id" element={<Hotel/>}/>
// //         <Route path="/login" element={<Login/>}/>
// //         <Route path="/register" element={<Register/>}/> */}
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;

// function App() {
//   const { darkMode } = useContext(DarkModeContext);
//   const dispatch = useAppDispatch();
//   const admin = useAppSelector(adminSelector) as Admin[] | null;

//   const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//     // const { user } = useContext(AuthContext);

//     console.log("2");
//     console.log(admin);
//     if (!admin) {
//       return <Navigate to="/login" />;
//     }

//     return <>{children}</>;
//   };

//   useEffect(() => {
//     dispatch(getAdminByCookieMain());
//   }, []);

//   // const userInputs = [
//   //   {
//   //     id: "username",
//   //     label: "Username",
//   //     type: "text",
//   //     placeholder: "Enter your username",
//   //   },
//   //   {
//   //     id: "password",
//   //     label: "Password",
//   //     type: "password",
//   //     placeholder: "Enter your password",
//   //   },
//   // ];

//   const userInputs = [
//     {
//       id: "username",
//       label: "Username",
//       type: "text",
//       placeholder: "john_doe",
//     },
//     {
//       id: "email",
//       label: "Email",
//       type: "email",
//       placeholder: "john_doe@gmail.com",
//     },
//     {
//       id: "phone",
//       label: "Phone",
//       type: "text",
//       placeholder: "+1 234 567 89",
//     },
//     {
//       id: "password",
//       label: "Password",
//       type: "password",
//     },
//     {
//       id: "country",
//       label: "Country",
//       type: "text",
//       placeholder: "USA",
//     },
//     {
//       id: "city",
//       label: "City",
//       type: "text",
//       placeholder: "USA",
//     },
//   ];

//   return (
//     <div className={darkMode ? "app dark" : "app"}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/">
//             <Route path="login" element={<Login />} />
//             <Route
//               index
//               element={
//                 <ProtectedRoute>
//                   <Home />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="users">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <List columns={userColumns} />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path=":userId"
//                 element={
//                   <ProtectedRoute>
//                     <Single />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="new"
//                 element={
//                   <ProtectedRoute>
//                     <New inputs={userInputs} title="Add New User" />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//             <Route path="hotels">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <List columns={hotelColumns} />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path=":productId"
//                 element={
//                   <ProtectedRoute>
//                     <Single />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="new"
//                 element={
//                   <ProtectedRoute>
//                     <NewHotel />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//             <Route path="rooms">
//               <Route
//                 index
//                 element={
//                   <ProtectedRoute>
//                     <List columns={roomColumns} />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path=":productId"
//                 element={
//                   <ProtectedRoute>
//                     <Single />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="new"
//                 element={
//                   <ProtectedRoute>
//                     <NewRoom />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";

import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./Datatablesource";
import Login from "./app/views/login/Login";
import Home from "./app/views/home/Home";
import Single from "./app/views/single/Single";
import New from "./app/views/new/New";
import NewHotel from "./app/views/newHotel/NewHotel";
import NewRoom from "./app/views/newRoom/NewRoom";
import List from "./app/views/list/List";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { adminSelector } from "./features/admin/adminSlice";
import { Admin } from "./features/admin/adminModel";
import { getAdminByCookieMain } from "./features/admin/adminAPI";
import "./style/dark.scss";
import { userInputs } from "./formSource";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const dispatch = useAppDispatch();
  const admin = useAppSelector(adminSelector) as Admin[] | null;

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!admin) {
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  };

  useEffect(() => {
    dispatch(getAdminByCookieMain());
  }, []);  

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

