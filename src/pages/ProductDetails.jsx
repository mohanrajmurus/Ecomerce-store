import React, { useState } from "react";
import axios from "axios";
import { Link, json, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BtnSlider from "../components/BtnSlider";
import ErrorRoutes from "../components/ErrorRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = process.env.REACT_APP_SERVER_URL;
const ProductDetails = () => {
  const products = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { id } = useParams();
  //console.log(id);
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
  const addCart = async (item) => {
    //const id = item.id;
    //console.log(id);
    if (Object.keys(user).length) {
      try {
        const { data } = await toast.promise(
          axios.put(`${url}/cart/${user._id}`, {
            id: item.id,
          }),{
            pending: ' Adding to cart',
        success: 'Sucessfully Added 👌',
        error: 'Failed 🤯'
          }
        );
        if (data) {
          dispatch({
            type: "SET_USER",
            payload: data,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
    //sessionStorage.setItem('cart',JSON.stringify(cart))
  };
  const removeCart = async (item) => {
    //const id = item.id
    //console.log(id);
    if (Object.keys(user).length) {
      try {
        const { data } = await toast.promise(axios.put(`${url}/remove/${user._id}`, {
          id: item.id,
        }),{ pending: ' Removing to cart',
        success: 'Sucessfully Removed 👌',
        error: 'Failed 🤯'});
        console.log(data);
        if (data) {
          dispatch({
            type: "SET_USER",
            payload: data,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
  };
  return (
    <>
      {products.length >= id ? (
        singleProduct.map((item, i) => {
          const orgPrice = Math.floor(item.price) * 50;
          //console.log(orgPrice);
          const curprice = Math.floor(
            orgPrice - (orgPrice * item.discountPercentage) / 100
          );

          return (
            <div className="single--product--container" key={i}>
              <ToastContainer
                position="top-left"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
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
                <div className="buttons">
                  {!cart.some((p) => p.id === item.id) ? (
                    <button onClick={() => addCart(item)} className="add--cart btn">
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      onClick={() => removeCart(item)}
                      className="remove--button btn"
                    >
                      Remove From Cart
                    </button>
                  )}
                  <Link to={'/placeorder'}>
                    <button className="btn" onClick={() => addCart(item)}>Buy Now</button>
                  </Link>
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
                <div className="description">
                  <h1>Product description:</h1>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <ErrorRoutes />
      )}
    </>
  );
};

export default ProductDetails;
