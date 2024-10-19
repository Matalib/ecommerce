import React, { useEffect, useState } from "react";
import bgCounter from "../../../../assets/imgs/bg_counter.png";
import "./Counter.css";
import { useNavigate } from "react-router-dom";

const Counter = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const saleEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const difference = saleEnd - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/Product");
  };
  return (
    <div className="container ">
      <div className="row align-items-center counter my-4 rounded-4 p-5">
        <div className="col-lg-6">
          <img src={bgCounter} alt="counter" className="img-fluid" />
        </div>
        <div className="col-lg-6 px-5">
          <small className="text-primary fw-bold">PROMOTION</small>
          <h2 className="mb-4 fw-bold">Hurry up! 40% OFF</h2>
          <p>Thousands of high tech are waiting for you</p>
          <div className="row text-center">
            <p className="text-start">Offer expires in:</p>
            <div className="count-box col-md-3">
              <h3>{timeLeft.days}</h3>
              <span>Days</span>
            </div>
            <div className="count-box col-md-3">
              <h3>{timeLeft.hours}</h3>
              <span>Hours</span>
            </div>
            <div className="count-box col-md-3">
              <h3>{timeLeft.minutes}</h3>
              <span>Minutes</span>
            </div>
            <div className="count-box col-md-3">
              <h3>{timeLeft.seconds}</h3>
              <span>Seconds</span>
            </div>
          </div>
          <button
            className="btn btn-dark px-4 py-2 mt-4"
            onClick={handleNavigate}
          >
            Shop now
          </button>
        </div>
      </div>

      <div className="row my-5">
        <div className="col-md-3">
          <div className="bg-light text-center py-5">
            <i className="fa-solid fa-truck-fast fa-2xl mb-4"></i>
            <h5>Free Shipping</h5>
            <span className="text-muted">Order above $200</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-light text-center py-5">
            <i className="fa-solid fa-money-bill-wave fa-2xl mb-4"></i>
            <h5>Money-back</h5>
            <span className="text-muted">30 days guarantee</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-light text-center py-5">
            <i className="fa-solid fa-shield-halved fa-2xl mb-4"></i>
            <h5>Secure Payments</h5>
            <span className="text-muted">Secured by Stripe</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-light text-center py-5">
            <i className="fa-solid fa-phone fa-2xl mb-4"></i>
            <h5>24/7 Support</h5>
            <span className="text-muted">Phone and Email support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
