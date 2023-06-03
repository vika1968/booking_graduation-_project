import { useEffect, useState } from "react";
import axios from "axios";
import { userSelector } from "../../features/user/userSlice";
import { useAppSelector } from "../../app/hooks";
import { User } from "../../features/user/userModel";
import { Link, useNavigate } from "react-router-dom";
import { OrderItem } from "../../features/user/orderModel";

const OrderResults = () => {
  const [results, setResults] = useState([]);
  const user = useAppSelector(userSelector) as User[] | null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderResults = async () => {
      try {
        if (user && user.length > 0) {
          const response = await axios.get(`/api/orders/${user[0].userID}`);
          setResults(response.data.orders);
        } else {
          alert("You are not an authorized user. Please login or register.");
          navigate("/");
        }
      } catch (error: any) {
        console.error(error.response.data.error);
      }
    };

    fetchOrderResults();
  }, []);

  return (
    <div>
      <div className="order-results">
        <h2 className="order-results__title">Your orders</h2>
        <div className="order-results__list">
          {results.map((result: OrderItem) => (
            <div key={result.id} className="order-results__list-item">
              <div>
                <h5>User:</h5> {result.email}
              </div>
              <div>
                <h5>Movie:</h5> {result.title}
              </div>
              <div>
                <h5>Seat Number: </h5>
                {result.seatNumber}
              </div>
              <div>
                <h5>Date: </h5>
                {new Date(result.date).toLocaleDateString("en-US")}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="buttons-back">
        <div className="HomePage__cta">
          <Link to="/movies" className="HomePage__button">
            Back to All Movies
          </Link>
        </div>
       
      </div>
    </div>
  );
};

export default OrderResults;
