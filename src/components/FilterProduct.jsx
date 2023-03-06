import React from "react";
import { useSelector } from "react-redux";
const FilterProduct = ({ handleChange,val }) => {
  
  return (
    <div className="product--filter">
      <div className="sort--by--price">
        <span className="title">Sort by Price</span>
        <form>
          <div className="low">
            <input type="radio" id = 'low'value={"lowtohigh"} onChange={handleChange} checked={val === 'lowtohigh'}/>
            <label htmlFor="low">Low to High</label>
          </div>
          <div className="high">
            <input type="radio" value={"hightolow"} id='high' onChange={handleChange}checked={val === 'hightolow'} />
            <label htmlFor="high">High to Low</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterProduct;
