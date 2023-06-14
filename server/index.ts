
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.static("client"));

// import userRouter from "./API/users/usersRoutes";
// app.use("/api/user", userRouter);

// import movieRouter from "./API/movies/movieRoutes";
//  app.use("/api/movie", movieRouter)


//  import bookingsRouter from "./API/bookings/bookingRoutes";
//  app.use("/api/booking", bookingsRouter)

//  import orderRouter from "./API/orders/ordersRoutes";
//  app.use("/api/orders", orderRouter)

// app.use("/api/auth", authRoute);
import adminRoutes from "./API/admin/adminRoutes";
app.use("/api/admin", adminRoutes);

import usersRoutes from "./API/users/usersRoutes";
app.use("/api/users", usersRoutes);

import hotelsRoutes from "./API/hotels/hotelsRoutes";
app.use("/api/hotels", hotelsRoutes);



// app.use("/api/rooms", roomsRoute);


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
