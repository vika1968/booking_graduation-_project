import React from "react";
import "./table.scss";

interface Row {
  id: number;
  product: string;
  img: string;
  customer: string;
  date: string;
  amount: number;
  method: string;
  status: string;
}

const List: React.FC = () => {
  const rows: Row[] = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    // Rest of the rows...
  ];

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th className="tableCell">Tracking ID</th>
            <th className="tableCell">Product</th>
            <th className="tableCell">Customer</th>
            <th className="tableCell">Date</th>
            <th className="tableCell">Amount</th>
            <th className="tableCell">Payment Method</th>
            <th className="tableCell">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="tableCell">{row.id}</td>
              <td className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </td>
              <td className="tableCell">{row.customer}</td>
              <td className="tableCell">{row.date}</td>
              <td className="tableCell">{row.amount}</td>
              <td className="tableCell">{row.method}</td>
              <td className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
