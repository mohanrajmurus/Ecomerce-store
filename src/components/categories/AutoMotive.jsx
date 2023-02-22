import React from "react";
import { useSelector } from "react-redux";
import SingleProduct from "../SingleProduct";
import FilterProduct from '../FilterProduct'
const AutoMotive = () => {
  const products = useSelector((state) => state.product);
  const mobiles = products.filter((item) => item.category === "automotive" || item.category === "motorcycle");
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

export default AutoMotive;
