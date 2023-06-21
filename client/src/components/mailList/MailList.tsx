import React from 'react';
import './mailList.scss';

const MailList: React.FC = () => {
  return (
    <div className="mail">
      <h1 className="mail__title">Save Time, save money!</h1>
      <span className="mail__desc">Sign up and receive the best deals.</span>
      {/* <div className="mail__input-container">
        <input type="email" placeholder="Enter your email" className="mail__input" />
        <button className="mail__button">Subscribe</button>
      </div> */}
    </div>
  );
}

export default MailList;
