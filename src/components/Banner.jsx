import React, { useState } from "react";

import BtnSlider from "./BtnSlider";

const Banner = ({data}) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const nextSlide = () => {
    if (slideIndex === data.length) setSlideIndex(1);
    else setSlideIndex(slideIndex + 1);
  };
  const prevSlide = () => {
    if (slideIndex === 1) {
      setSlideIndex(data.length);
    } else setSlideIndex(slideIndex - 1);
  };
  return (
    <div className="slider--container">
      {data.map((item, i) => {
        return (
          <div className={slideIndex === i + 1 ? "slide-active" : "slide"} key={i}>
            <img src={item.image} alt={item.title} />
          </div>
        );
      })}
      <BtnSlider direction={"next"} moveSlide={nextSlide} />
      <BtnSlider direction={"prev"} moveSlide={prevSlide} />
    </div>
  );
};

export default Banner;
