import React from "react";
import "./footer.scss";
import {FaGithub, FaTwitter, FaLinkedin} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__icons">
        <a href="https://github.com/ornefacciola"><FaGithub className="footer__icon" /></a>
        <a href="https://twitter.com/orne_dev"><FaTwitter className="footer__icon" /></a>
        <a href="https://www.linkedin.com/in/ornella-facciola-a43219216/"><FaLinkedin className="footer__icon" /></a>
      </div>
      <div className="footer__text">  Your Booking .</div>
    </div>
  );
};

export default Footer;
