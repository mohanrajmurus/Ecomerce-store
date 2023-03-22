import React, { useState } from "react";
import carticon from "../assets/icons/cart.svg";
import hamburger from "../assets/icons/hamburger.png";
import close from "../assets/icons/close.png";
import search from "../assets/icons/search.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import BillCal from "./BillCal";
import Profile from './Profile'
const Header = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  //
  //cart modal
  const [cartOpen, setCartOpen] = useState(false);
  //mobile menu bar
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    setCartOpen(!cartOpen)
  }
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
        <div className={isOpen ? "header--logo" : "header--logo--mobile"} onClick={()=>setIsOpen(true)}>
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
        <div className={isOpen ? "header--profile" : "header--profile--mobile"} >
          {Object.keys(user).length ? (
            <Profile setIsOpen={setIsOpen}/>
          ) : (
            <NavLink to={"/login"}>
              <button className="login" onClick={()=>setIsOpen(true)}>Login</button>
            </NavLink>
          )}
        </div>
        <div className="header--cart" onClick={handleClick}>
          <img src={carticon} alt="" className="cart--icon" />
          <span className="cart--count">{cart.length}</span>
        </div>
      </header>
      {cartOpen && (
        <div className="cart--container">
          <img
            src={close}
            alt="close"
            onClick={handleClick}
            className="closemenu"
          />
          {cart.length === 0 ? (
            <p>No Items in Cart</p>
          ) : (
            <>
              <div className="cart--page">
                <Cart />
                <BillCal onClick={handleClick}/>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
