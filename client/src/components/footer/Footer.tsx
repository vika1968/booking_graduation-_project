

import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import "./footer.scss";

const Footer: React.FC = () => {
  const openLinkInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="footer">
      <div className="footer__icons">
        <FaGithub className="footer__icon" onClick={() => openLinkInNewTab("https://github.com/topics/booking-system")} />
        <FaTwitter className="footer__icon" onClick={() => openLinkInNewTab("https://twitter.com/bookingcom")} />
        <FaLinkedin className="footer__icon" onClick={() => openLinkInNewTab("https://www.linkedin.com/company/booking.com/jobs/")} />
      </div>
      <div className="footer__text">Your Booking Place here</div>
    </div>
  );
};

export default Footer;

