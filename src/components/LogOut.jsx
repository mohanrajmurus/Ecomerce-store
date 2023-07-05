import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LogOut = () => {
  const dispatch = useDispatch();
  const notify = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleLogOut = () => {
    try {
      dispatch({
        type: "REMOVE_USER",
        payload: {},
      });
      dispatch({
        type: "CLEAR_CART",
      });
      notify("SignOut Sucessfully");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div onClick={handleLogOut}>LogOut</div>
    </>
  );
};

export default LogOut;
