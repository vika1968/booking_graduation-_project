import React from "react";

interface OrderItemProps {
  email: string;
  title: string;
  seatNumber: number;
  date: string;
}

const OrderItem: React.FC<OrderItemProps> = ({
  email,
  title,
  seatNumber,
  date,
}) => {
  return (
    <div className="order-item">
      <div className="order-item__email">{email}</div>
      <div className="order-item__movie">{title}</div>
      <div className="order-item__seat-number">{seatNumber}</div>
      <div className="order-item__date">{date}</div>
    </div>
  );
};

export default OrderItem;
