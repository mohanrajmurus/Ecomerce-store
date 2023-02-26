import React from "react";
import { useDispatch } from "react-redux";
const SingleCartData = ({ item }) => {
  const originalPrice = Math.floor(item.price) * 50;
  const discountPrice =
    originalPrice - (originalPrice * item.discountPercentage) / 100;
  const dispatch = useDispatch();
  return (
    <div className="cart--item">
      <div className="first--col">
        <div className="item--image">
          <img src={item.thumbnail} alt={item.title} />
        </div>
        <div className="item--quantity">
          <button
            className="decrease"
            disabled={item.qty === 1 ? true : false}
            onClick={() => dispatch({ type: "DECREASE_QTY", payload: item })}
          >
            -
          </button>
          <span className="quantity">{item.qty}</span>
          <button
            className="increase"
            onClick={() => dispatch({ type: "INCREASE_QTY", payload: item })}
          >
            +
          </button>
        </div>
      </div>
      <div className="sec--col">
        <div className="item--title">
          <span className="title">{item.title}</span>
        </div>
        <div className="item--price">
          <span className="original--price">₹{originalPrice}</span>
          <span className="dis--price">₹{Math.floor(discountPrice)}</span>
          <span className="discount--percentage">
            {item.discountPercentage}%
          </span>
        </div>
        <div className="rm--btn">
          <button
            className="remove--product"
            onClick={() => dispatch({ type: "REMOVE_PRODUCT", payload: item })}
          >
            Remove
          </button>
        </div>
      </div>
     
     
    </div>
  );
};

export default SingleCartData;
