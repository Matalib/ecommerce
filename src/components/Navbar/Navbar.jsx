import React, { useContext, useState } from "react";
// import img from '../../assets/images/freshcart.webp'
import { NavLink } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/imgs/logo_1.png";
import "./Navbar.css";
import { CartContext } from "../../context/CartContextProvider";

export default function Navbar() {
  let navigate = useNavigate();
  let { isLogin, setLogin } = useContext(userContext);
  const { cartItemsCount } = useContext(CartContext);
  function logOut() {
    localStorage.removeItem("userToken");
    navigate("/register");
    setLogin(null); //modify isLogin from token >>> null
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 fixed-top shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={Logo} alt="Logo" className="logo" />
          <span className="fw-bold px-2 mt-1">E-Commerce</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isLogin ? (
              <>
                <li className="nav-item mx-2">
                  <NavLink to={"home"} className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink to={"products"} className="nav-link">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item mx-2 position-relative">
                  <NavLink to={"carts"} className="nav-link ">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="bg-danger position-absolute top-0 start-100 translate-middle badge rounded-pill">
                      {cartItemsCount || 0}
                    </span>
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>

          <ul className="navbar-nav mb-2 mb-lg-0">
            {!isLogin ? (
              <>
                <li className="nav-item mx-2">
                  <NavLink
                    to={"register"}
                    className="btn btn-dark px-3 py-2 rounded-3"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"login"}
                    className="btn btn-dark px-3 py-2 rounded-3"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item ms-3">
                <button
                  onClick={logOut}
                  role="button"
                  className="btn btn-dark px-3 py-2 rounded-3"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
