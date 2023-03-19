import React from "react";
import { useDispatch,useSelector } from "react-redux";
import axios from 'axios'
import { json } from "react-router-dom";
const LogOut = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state=>state.cart)
  const user = useSelector(state=>state.user)
  const url = process.env.REACT_APP_SERVER_URL;
  const handleLogOut = async () => {
   try {
    dispatch({
      type: "REMOVE_USER",
      payload: {},
    });
   } catch (error) {
    console.error(error);
   }

  };
  return <div onClick={handleLogOut}>LogOut</div>;
};

export default LogOut;
