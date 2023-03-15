import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BtnSlider from "../components/BtnSlider";
const ProductDetails = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state) => state.product);
  const singleProduct = product.filter((item) => item.id === Number(id));
  const [slideIndex, setSlideIndex] = useState(1);
  const nextSlide = (len) => {
    if (slideIndex === len) setSlideIndex(1);
    else setSlideIndex(slideIndex + 1);
  };
  const prevSlide = (len) => {
    if (slideIndex === 1) {
      setSlideIndex(len);
    } else setSlideIndex(slideIndex - 1);
  };
  const addCart = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
  };
  const removeCart = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
  };
  return (
    <>
      {singleProduct.map((item, i) => {
        const orgPrice = Math.floor(item.price) * 50;
        //console.log(orgPrice);
        const curprice = Math.floor(
          orgPrice - (orgPrice * item.discountPercentage) / 100
        );

        return (
          <div className="single--product--container" key={i}>
            <div className="image--container">
              <div className="slide--container">
                {item.images.map((image, i) => {
                  return (
                    <div
                      className={
                        slideIndex === i + 1 ? "slide-active" : "slide"
                      }
                      key={i}
                    >
                      <img src={image} alt={item.title} />
                    </div>
                  );
                })}
                <BtnSlider
                  direction={"next"}
                  moveSlide={() => nextSlide(item.images.length)}
                />
                <BtnSlider
                  direction={"prev"}
                  moveSlide={() => prevSlide(item.images.length)}
                />
              </div>
             <div>
             {!cart.some((p) => p.id === item.id) ? (
            <button onClick={()=>addCart(item)} >Add to Cart</button>
          ) : (
            <button onClick={()=>removeCart(item)} className='remove--button'>Remove From Cart</button>
          )}
             </div>
            </div>
            <div className="details--container">
              <h1 className="title">{item.title}</h1>
              <div>
              <span className="current--price">₹ {curprice}</span>
              <span className="original--price">
                <span className="price">₹{orgPrice}</span>
                <span className="discount">
                  {item.discountPercentage}%off
                </span>
              </span>
              </div>
              <div>
              <span>Ratings:{item.rating}</span>
              </div>
              <div>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductDetails;
