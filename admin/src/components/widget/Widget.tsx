// import React from "react";
// import "./widget.scss";

// interface WidgetProps {
//   type: "user" | "order" | "earning" | "balance";
// }

// const Widget: React.FC<WidgetProps> = ({ type }) => {
//   let data: {
//     title: string;
//     isMoney: boolean;
//     link: string;
//     icon: React.ReactNode;
//   } = {
//     title: "",
//     isMoney: false,
//     link: "",
//     icon: null,
//   };

//   // temporary
//   const amount = 100;
//   const diff = 20;

//   switch (type) {
//     case "user":
//       data = {
//         title: "USERS",
//         isMoney: false,
//         link: "See all users",
//         icon: (
//           <div
//             className="icon"
//             style={{
//               backgroundColor: "crimson",
//               color: "white",
//               fontSize: "24px",
//               padding: "5px",
//               borderRadius: "50%",
//             }}
//           >
//             User Icon
//           </div>
//         ),
//       };
//       break;
//     case "order":
//       data = {
//         title: "ORDERS",
//         isMoney: false,
//         link: "View all orders",
//         icon: (
//           <div
//             className="icon"
//             style={{
//               backgroundColor: "goldenrod",
//               color: "white",
//               fontSize: "24px",
//               padding: "5px",
//               borderRadius: "50%",
//             }}
//           >
//             Order Icon
//           </div>
//         ),
//       };
//       break;
//     case "earning":
//       data = {
//         title: "EARNINGS",
//         isMoney: true,
//         link: "View net earnings",
//         icon: (
//           <div
//             className="icon"
//             style={{
//               backgroundColor: "green",
//               color: "white",
//               fontSize: "24px",
//               padding: "5px",
//               borderRadius: "50%",
//             }}
//           >
//             Earnings Icon
//           </div>
//         ),
//       };
//       break;
//     case "balance":
//       data = {
//         title: "BALANCE",
//         isMoney: true,
//         link: "See details",
//         icon: (
//           <div
//             className="icon"
//             style={{
//               backgroundColor: "purple",
//               color: "white",
//               fontSize: "24px",
//               padding: "5px",
//               borderRadius: "50%",
//             }}
//           >
//             Balance Icon
//           </div>
//         ),
//       };
//       break;
//     default:
//       break;
//   }

//   return (
//     <div className="widget">
//       <div className="left">
//         <span className="title">{data.title}</span>
//         <span className="counter">
//           {data.isMoney && "$"} {amount}
//         </span>
//         <span className="link">{data.link}</span>
//       </div>
//       <div className="right">
//         <div className={`percentage ${diff >= 0 ? "positive" : "negative"}`}>
//           {diff >= 0 ? "+" : "-"}
//           {Math.abs(diff)}%
//         </div>
//         {data.icon}
//       </div>
//     </div>
//   );
// };

// export default Widget;


import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
interface WidgetProps {
  type: "user" | "order" | "earning" | "balance";
}

const Widget: React.FC<WidgetProps> = ({ type }) => {
  let data: {
    title: string;
    isMoney: boolean;
    link: string;
    icon: React.ReactNode;
  } = {
    title: "",
    isMoney: false,
    link: "",
    icon: null,
  };

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
