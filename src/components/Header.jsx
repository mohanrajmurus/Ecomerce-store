import React, { useState } from "react";
import cart from "../assets/icons/cart.svg";
import hamburger from "../assets/icons/hamburger.png";
import close from "../assets/icons/close.png";
import search from "../assets/icons/search.png";
import { NavLink } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="container">
      <header className="header">
        <div
          className={isOpen ? "header--menubar" : "header--menubar "}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <img src={hamburger} alt="menubar" />
          ) : (
            <img src={close} alt="menubar" />
          )}
        </div>
        <div className={isOpen ? "header--logo" : "header--logo--mobile"}>
          <NavLink to={"/"}>
            <h1 className="header--logo__text">Store</h1>
          </NavLink>
        </div>
        <div className="header--searchbar">
          <input
            type="text"
            name="search-products"
            placeholder="search for a products"
          />
          <img src={search} alt="search-icon" className="search--icon" />
        </div>
        <div className={isOpen ? "header--profile" : "header--profile--mobile"}>
          <button className="login">Login</button>
        </div>
        <div className="header--cart">
          <img src={cart} alt="" className="cart--icon" />
          <span className="cart--count">20</span>
        </div>
      </header>
    </div>
  );
};

export default Header;
