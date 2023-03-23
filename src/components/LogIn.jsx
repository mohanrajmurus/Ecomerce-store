import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = process.env.REACT_APP_SERVER_URL;

//console.log(url);
const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const products = useSelector((state) => state.product);
  //error message while login
  //get input from user
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const notify = (msg, type) => {
    if (type === "err")
      toast.error(msg, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  };
  const submitData = async (e) => {
    //prevent reload while submit form data
    e.preventDefault();
    try {
      const res = await toast.promise(axios.post(`${url}/login`, user), {
        pending: " Loading",
        success: "Sucessfully loggedin 👌",
        error: "Login failed 🤯",
      });
      const data = await res.data;
      //console.log(data);
      //store user details to redux store
      //s
      //console.log(data.cart)
      dispatch({
        type: "SET_USER",
        payload: data,
      });
      if (data.cart) {
        data.cart.map((id) => {
          return products.filter((item) =>
            item.id === id
              ? dispatch({
                  type: "ADD_TO_CART",
                  payload: item,
                })
              : null
          );
        });
        //console.log(cart);
      }
      // notify('Sucessfully Loggedin','sucess')
      setTimeout(() => navigate("/"), 2000);

      //reset values
      setUser({
        email: "",
        password: "",
      });
    } catch (error) {
      //console.log(error);
      if (await error.response) notify(error.response.data, "err");
      else notify("Server Error", "err");
    }
    toast.clearWaitingQueue()
  };
  return (
    <div className="login--container">
      <div className="login">
        <span className="title">Login</span>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <form onSubmit={submitData}>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="name"
              placeholder="email"
              required
              onChange={handleChange}
              value={user.email}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              required
              onChange={handleChange}
              value={user.password}
            />
          </div>
          <div className="button">
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="altnate">
          <span>Don't have account with us</span>
          <NavLink to={"/register"}>
            <button>Create Account</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
