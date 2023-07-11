import "./single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/Table";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="single__container">
        <Navbar />
        <div className="single__top">
          <div className="single__left">        
            <div className="single__editButton"></div>
            <h1 className="single__title">Information</h1>
            <div className="single__item">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25wSgGGaOwHY5VR8g5ZzKOhyG0TG_jwB_IQ&usqp=CAU"
                alt=""
                className="single__itemImg"
              />
              <div className="single__details">
                <h1 className="single__itemTitle caption">Kim Fox</h1>
                <div className="single__detailItem">
                  <span className="single__itemKey caption">Email:</span>
                  <span className="single__itemValue">kimfox@gmail.com</span>                 
                </div>
                <div className="single__detailItem">
                  <span className="single__itemKey caption">Phone:</span>
                  <span className="single__itemValue">+1 2345 67 89</span>
                </div>
                <div className="single__detailItem">
                  <span className="single__itemKey caption">Address:</span>
                  <span className="single__itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="single__detailItem">
                  <span className="single__itemKey caption">Country:</span>
                  <span className="single__itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="single__right">
            <Chart aspect={3 / 1} title="User Spending (Last 6 Months)" />
          </div>
        </div>
        <div className="single__bottom">
          <h1 className="single__title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;

