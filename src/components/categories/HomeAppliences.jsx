import React from "react";
import { useSelector } from "react-redux";
import SingleProduct from "../SingleProduct";
import FilterProduct from '../FilterProduct'
const HomeAppliences = () => {
  const products = useSelector((state) => state.product);
  const mobiles = products.filter((item) => item.category === "home-decoration" || item.category === "furniture");
  //console.log(mobiles);
  return (
    <div className="product--container">
      <FilterProduct/>
      <div className="products">
      {mobiles.map((item, i) => {
        return <SingleProduct prod={item} key={i}/>;
      })}
      </div>
    </div>
  );
};

export default HomeAppliences;
