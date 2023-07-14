import React from "react";

interface OrderItemProps {
  username: string;
  email: string;
  country: string;
  city: string;
  hotelname: string;
  hotelcity: string;
  datestart: Date;
  dateend: Date;
  roomnumber: number;
  price: number;
}

const Orders: React.FC<OrderItemProps> = ({
    username,
    email,
    country,
    city,
    hotelname,
    hotelcity,
    datestart,
    dateend,
    roomnumber,
    price,
}) => {
  return (
    <div className="order-item">
      <div className="order-item__username">{username}</div>
      <div className="order-item__email">{email}</div>
      <div className="order-item__country">{country}</div>
      <div className="order-item__city">{city}</div>
      <div className="order-item__hotelname">{hotelname}</div>
      <div className="order-item__hotelcity">{hotelcity}</div>
      <div className="order-item__datestart">{datestart.toString()}</div>
      <div className="order-item__dateend">{dateend.toString()}</div>
      <div className="order-item__roomnumber">{roomnumber.toString()}</div>
      <div className="order-item__price">{price.toString()}</div>
    </div>
  );
};

export default Orders;