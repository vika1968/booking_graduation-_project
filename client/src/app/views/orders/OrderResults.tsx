import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { User } from "../../../features/user/userModel";
import {
  Status,
  userSelector,
  userStatusSelector,
} from "../../../features/user/userSlice";
import { OrderInterface } from "../../../helpers/orderInterface";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../../helpers/toast";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getUserByCookieMain } from "../../../features/user/userAPI";
import { SERVER_URL } from "../../../../config/config";
import "./orderResults.scss";


const OrderResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("Your orders:");
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector) as User[] | null;
  const userStatus = useAppSelector(userStatusSelector);

  useEffect(() => {
    dispatch(getUserByCookieMain());
    const fetchOrderResults = async () => {
      try {       
        if (userStatus === Status.IDLE && user) {
          const response = await axios.get(`${SERVER_URL}/api/orders/${user[0].userID}`);
          setResults(response.data.orders);
          if (response.data.orders.length === 0) {
            setMessage("You don't have any orders yet.");
          }
        }      
     
      } catch (error: any) {
        showToast(error.response.data.error, "error no redirect", "");
      }
    };

    fetchOrderResults();
  }, [user]);

  const handleClick = () => {
    navigate("/");
  };
  
  return (
    <div>
      <ToastContainer />
      <div className="order-results">
        <h2 className="order-results__title">{message}</h2>
        <div className="order-results__list">
          {results.map((result: OrderInterface, indx: number) => (
            <div key={indx} className="order-results__list-item">
              <h4>--User information--</h4>
              <div>
                <h5>User Name:</h5> {result.username}
              </div>
              <div>
                <h5>email:</h5> {result.email}
              </div>
              <div>
                <h5>Country:</h5> {result.country}
              </div>
              <div>
                <h5>City:</h5> {result.city}
              </div>
              <h4>--Hotel information--</h4>
              <div>
                <h5>Hotel Name:</h5> {result.hotelname}
              </div>
              <div>
                <h5>Hotel Location:</h5> {result.hotelcity}
              </div>
              <div>
                <h5>Room Number:</h5> {result.roomnumber.toString()}
              </div>
              <div>
                <h5>Price:</h5> ${result.price.toString()}
              </div>
              <div>
                <h5>Booking dates: </h5>
                {new Date(result.datestart).toLocaleDateString("en-US")} -{" "}
                {new Date(result.dateend).toLocaleDateString("en-US")}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="button-container">
        <button className="button-back" onClick={handleClick}>
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default OrderResults;
