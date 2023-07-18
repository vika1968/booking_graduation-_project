import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/Table";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { UserInterface } from "./../../../helpers/userInterface";
import { showToast } from "../../../helpers/toast";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
//import { SERVER_URL } from "../../../config/config";
import "./single.scss";

const Single = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL?.replace(/['"`]+/g, '');
  const location = useLocation();
  const id = location.search.split("?")[1];
  const [singleUser, setSingleUser] = useState<UserInterface[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const handleGetUserByID = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/users/${id}`);
        const { success, user } = data;

        if (success) {
          setSingleUser(user);
        }
      } catch (error: any) {
        showToast(error.response.data.error, "error no redirect", "");
      }
    };

    handleGetUserByID();
  }, [id]);

  //Define women or men and show the corresponding image. It's not accurate, but I'll try :)
  //If there are 2 words (first and last name), then suppose the name is the first word. So I do split
  useEffect(() => {
    if (singleUser?.[0].username) {
      let words = [];
      if (singleUser[0].username.includes(" ")) {
        words = singleUser[0].username.split(" ");
      } else {
        words = [singleUser[0].username];
      }

      const firstWord = words[0];
      const lastCharacter = firstWord.toLowerCase().charAt(firstWord.length - 1);

      const vowels = ["a", "e", "i", "o", "u"];
      const endsWithVowel = vowels.includes(lastCharacter);

      // Gili, I don't know which is better.
      // Beautiful people, a man or a woman, or an avatar. I chose an avatar

      // setImageUrl(endsWithVowel
      //   ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR25wSgGGaOwHY5VR8g5ZzKOhyG0TG_jwB_IQ&usqp=CAU'
      //   : 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      // );

      setImageUrl(
        endsWithVowel
          ? "data:image/jpeg;base64,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"
          : "data:image/png;base64,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"
      );
    }
  }, [singleUser?.[0].username]);


  if (singleUser === null) {
    return <div> Loading ... </div>;
  } else {
    return (
      <>
        <ToastContainer />
        <div className="single">
          <Sidebar />
          <div className="single__container">
            <Navbar />
            <div className="single__top">
              <div className="single__left">
                <div className="single__editButton"></div>
                <h1 className="single__title">Information</h1>
                <div className="single__item">
                  <img src={imageUrl} alt="" className="single__itemImg" />
                  <div className="single__details">
                    <h1 className="single__itemTitle caption">
                      {singleUser[0].username}
                    </h1>
                    <div className="single__detailItem">
                      <span className="single__itemKey caption">Email:</span>
                      <span className="single__itemValue">
                        {singleUser[0].email}
                      </span>
                    </div>
                    <div className="single__detailItem">
                      <span className="single__itemKey caption">Phone:</span>
                      <span className="single__itemValue">
                        {singleUser[0].phone}
                      </span>
                    </div>
                    <div className="single__detailItem">
                      <span className="single__itemKey caption">
                        Address ( city ):
                      </span>
                      <span className="single__itemValue">
                        {singleUser[0].city}
                      </span>
                    </div>
                    <div className="single__detailItem">
                      <span className="single__itemKey caption">Country:</span>
                      <span className="single__itemValue">
                        {singleUser[0].country}
                      </span>
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
              <List />
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Single;
