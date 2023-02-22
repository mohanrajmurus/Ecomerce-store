import React from "react";
import leftArrow from "../assets/icons/left-arrow.svg";
import rightArrow from "../assets/icons/right-arrow.svg";
const BtnSlider = ({ direction, moveSlide }) => {
  return (
    <button
      className={direction === "next" ? "btn--slider next" : "btn--slider prev"}
      onClick={moveSlide}
    >
      <img src={direction === "next" ? rightArrow : leftArrow} alt="" />
    </button>
  );
};

export default BtnSlider;
