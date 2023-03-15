import React from "react";
import Categories from "../components/Categories";
import Banner from "../components/Banner";
import slide1 from "../assets/images/slider1.jpg";
import slide2 from "../assets/images/slider2.png";
import slide3 from "../assets/images/slider3.jpg";
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
const Main = () => {
  return (
    <div className="main--content">
      <Categories />
      <Banner data={data}/>
    </div>
  );
};

export default Main;
