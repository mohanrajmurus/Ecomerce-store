import React, { useState } from "react";
import slide1 from "../assets/images/slider1.jpg";
import slide2 from "../assets/images/slider2.png";
import slide3 from "../assets/images/slider3.jpg";
import BtnSlider from "./BtnSlider";
const data = [
  {
    title: "Slide 1",
    content: "",
    image: slide1,
  },
  {
    title: "Slide 2",
    content: "",
    image: slide2,
  },
  {
    title: "Slide 3",
    content: "",
    image: slide3,
  },
];
const Banner = () => {
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
          <div className={slideIndex === i + 1 ? "slide-active" : "slide"}>
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
