import React from "react";
import { NavLink } from "react-router-dom";
import home_app from "../assets/icons/home_app.png";
import electronics from "../assets/icons/electronics.png";
import fashion from "../assets/icons/fashion.png";
import groceries from "../assets/icons/groceries.png";
import mobile from "../assets/icons/mobile.png";
import Healthcare from "../assets/icons/Healthcare.png";
import automotive from "../assets/icons/automotive.png";
import offers from "../assets/icons/offers.png";
const categories = [
  {
    icon: mobile,
    text: "Mobile",
  },
  {
    icon: electronics,
    text: "Electronics",
  },
  {
    icon: fashion,
    text: "Fashion",
  },
  {
    icon: home_app,
    text: "Home Appliences",
  },
  {
    icon: groceries,
    text: "Grocery",
  },
  {
    icon: Healthcare,
    text: "Health Care",
  },
  {
    icon: automotive,
    text: "Auto Motive",
  },
  {
    icon: offers,
    text: " Top Offers",
  },
];
const Categories = () => {
  return (
    <React.Fragment>
      <div className="category--items">
        {categories.map((item, i) => {
          return (
            <NavLink to={`/${item.text.toLowerCase().replace(/\s/g,'')}`} className="item" key={i}>
              <img src={item.icon} alt={item.text} />
              <span>{item.text}</span>
            </NavLink>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Categories;
