import React from "react";
import Featured from "../../../components/featured/Featured";
import FeaturedProperties from "../../../components/featuredProperties/FeaturedProperties";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import Promotion from "../../../components/promotion/Promotion";
import Navbar from "../../../components/navbar/Navbar";
import PropertyList from "../../../components/propertyList/PropertyList";
import "./home.scss";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Header type="" />
      <div className="home-container">
        <h1 className="home-title">The most beautiful capitals</h1>
        <Featured />
        <h1 className="home-title">Guest houses</h1>
        <PropertyList />
        <FeaturedProperties />
        <Promotion />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
