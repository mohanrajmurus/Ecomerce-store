import React from "react";
import { useSelector } from "react-redux";
import SingleProduct from "../SingleProduct";
import FilterProduct from "../FilterProduct";
const MensFashion = () => {
  const products = useSelector((state) => state.product);
  const mobiles = products.filter(
    (item) =>
      item.category === "mens-shirts" ||
      item.category === "mens-shoes" ||
      item.category === "mens-watches" ||
      item.category === "sunglasses"
  );
  //console.log(mobiles);
  return (
    <div className="product--container">
      <FilterProduct />
      <div className="products">
        {mobiles.map((item, i) => {
          return <SingleProduct prod={item} key={i} />;
        })}
      </div>
    </div>
  );
};

export default MensFashion;
