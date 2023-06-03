import React, { useEffect, useState } from "react";
import "./Booking.scss";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../helpers/api-helpers";
import MovieScheme from "../../helpers/MovieScheme";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/user/userSlice";
import { User } from "../../features/user/userModel";
import { useDispatch } from "react-redux";
import { Add_Order, reset_Orders, orderSelector } from "../Orders/orderSlice";
import { OrderScheme } from "../Orders/OrderModel";
import axios from "axios";

const Booking = () => {
  const [movie, setMovie] = useState<MovieScheme | null>(null);
  const [inputs, setInputs] = useState<{ seatNumber: string; date: string }>({
    seatNumber: "",
    date: "",
  });

  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const user = useAppSelector(userSelector) as User[] | null;
  const orders = useAppSelector(orderSelector)
  const orderState = useAppSelector((state) => state.order); 

  const saveMyOrders = (item: OrderScheme) => {
    if (
      !inputs.seatNumber ||
      isNaN(parseInt(inputs.seatNumber)) ||
      !inputs.date
    ) {
      alert("Please select a seat number and date.");
      return;
    }  
    dispatch(Add_Order(item));    
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const res = await getMovieDetails(id);
      setMovie(res.movie[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeSeatNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      if (movie) {
        newBooking({ ...inputs, movie: movie.movieID, userID: user[0].userID })
          .then((res) => alert(res.success))
          .catch((err) => console.log(err));
      }
    } else {
      alert(
        "You are not an authorized user and do not have the right to place an order. Please login or register."
      );
      navigate("/");
    }
  };

  const handleGoBack = () => {
    navigate("/movies");
  };

  const handleSaveAllBookings = async () => {
    try {   

      if(orderState.orders.length>0){
        const response = await axios.post("/api/booking/batch", orders);       
        alert("All your orders have been successfully added.");
        dispatch(reset_Orders())
      }
      else{
        alert("You don't have any pre-recorded orders.");
      }  
    
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        console.log(error.response.data.error);
      } else {
        console.error("Error sending data to the server:", error);
      }
    }
  };

  const handleGoToBookingHistory = () => {
    if (user && user.length > 0) {
      navigate(`/order/${user[0].userID}`);
    } else {
      alert("You are not an authorized user. Please login or register.");
      navigate("/");
    }
  };

  return (
    <div>
      {movie && (
        <div>
          <div className="booking__header">
            <hr />
            <h4 className="title">
              <u>Book Tickets of Movie: "{movie.title}"</u>
            </h4>
            <hr />
          </div>
          <div className="booking">
            <div className="booking__poster">
              <img src={movie.posterUrl} alt={movie.title} />
            </div>
            <div className="booking__form">
              <form onSubmit={handleSubmit}>
                <label>Seat Number:</label>
                <input
                  name="seatNumber"
                  value={inputs.seatNumber}
                  onChange={handleChangeSeatNumber}
                  type="number"
                  required
                />
                <label>Booking Date:</label>
                <input
                  name="date"
                  type="date"
                  value={inputs.date}
                  onChange={handleChangeSeatNumber}
                  required
                />
                <button type="submit">Book Now</button>
              </form>
              <div className="booking__details">
                <p>{movie.description}</p>
                <p>
                  <strong>Starrer:</strong> {movie.actors}
                </p>
                <p>
                  <strong>Release Date:</strong>{" "}
                  {new Date(movie.releaseDate).toDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="booking-btn__container">
        <button className="booking-btn__goBack" onClick={handleGoBack}>
          Go to all movies
        </button>
        <button
          className="booking-btn__history booking-btn__goMyOrders"
          onClick={handleGoToBookingHistory}
        >
          Go to booking history
        </button>

        <button
          className="booking-btn__save-orders booking-btn__goMyOrders"
          onClick={() =>
            saveMyOrders({
              movieID: movie?.movieID || 0,            
              date: inputs.date,
              seatNumber: parseInt(inputs.seatNumber),
              userID: user?.[0]?.userID || 0,
            })
          }
        >
          Save my bookings temporarily
        </button>

        <button
          className="booking-btn__save-in_DB booking-btn__goMyOrders"
          onClick={handleSaveAllBookings}
        >
          Book all saved orders
        </button>
      </div>
    </div>
  );
};

export default Booking;
