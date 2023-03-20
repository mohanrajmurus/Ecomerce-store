import React from "react";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
const SingleProduct = ({ prod,category }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  //console.log(cart);
  //console.log(prod);
  const orgPrice = Math.floor(prod.price) * 50;
  //console.log(orgPrice);
  const curprice = Math.floor(
    orgPrice - (orgPrice * prod.discountPercentage) / 100
  );

  //add product to cart
  const addCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: prod,
    });
    console.log(cart);
  };

  //remove the product from cart
  const removeCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: prod,
    });
  };
  //console.log(curprice);
  return (
    <div className="product">
      <div className="product--details">
        <div className="product--details__image">
          <img src={prod.images[0]} alt={prod.title}  className='image'/>
        </div>
        <div className="product--details__description">
          <Link to={`/products/${prod.id}`}><span className="title">{prod.title}</span></Link>
          <span className="ratings--stock">
            <span className="ratings">{prod.rating} ★</span>
            <span className="stock">Stock: {prod.stock}</span>
          </span>
        </div>
      </div>
      <div className="product--price">
        <span className="current--price">₹ {curprice}</span>
        <span className="original--price">
          <span className="price">₹{orgPrice}</span>
          <span className="discount">{prod.discountPercentage} % off</span>
        </span>
        <span className="delivermode">Free Delivery</span>
      </div>
    </div>
  );
};

export default SingleProduct;
