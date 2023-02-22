import React from "react";
import { useSelector } from "react-redux";
import SingleProduct from "../SingleProduct";
import FilterProduct from "../FilterProduct";
const WomensFashion = () => {
  const products = useSelector((state) => state.product);
  const mobiles = products.filter(
    (item) =>
      item.category === "tops" ||
      item.category === "womens-dresses" ||
      item.category === "womens-shoes" ||
      item.category === "womens-watches" ||
      item.category === 'womens-bags' ||
      item.category === "womens-jewellery"
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

export default WomensFashion;
