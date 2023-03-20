import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const url = process.env.REACT_APP_SERVER_URL;

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    mobileNum:''
  });
  //error message while login
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState(undefined);
  const [getotp, setGetotp] = useState(false);
  const [userotp, setUserotp] = useState(undefined);
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
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    if (type === "sucess")
      toast.success(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    if (type === "war")
      toast.warn(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  };
  //console.log(userotp);
  //console.log(otp);
  const getOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await toast.promise(axios.post(`${url}/emailverify`, {
        email: user.email,
      }),{
        pending: ' sending OTP',
        success: 'OTP Sent 👌',
        error: 'Failed 🤯'
      });
      if (data) {
        //notify("OTP Sent to Email", "sucess");
        setOtp(data);
        setGetotp(true);
      }
    } catch (err) {
      notify(err.response.data, "err");
    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === Number(userotp)) {
      setEmailVerified(true);
      notify("Email Id verification sucessfull", "sucess");
      setGetotp(false);
    } else {
      notify("OTP Invalid", "err");
    }
  };
  const submitData = async (e) => {
    e.preventDefault();
    if (emailVerified) {
      try {
        //prevent reload while submit form data

        const res = await toast.promise(axios.post(`${url}/register`, user),{
          pending: 'Loading',
        success: 'Sucessfully Registred 👌',
        error: 'Signup failed 🤯'
        });
        const data = await res.data;
        //console.log(data);
        //notify("Account Create Sucessfull", "sucess");
        if (data) {
          setTimeout(() => {
            navigate("/login")
          }, 3000);;
        }
        //reset values
        setUser({
          fullName: "",
          email: "",
          password: "",
        });
      } catch (error) {
        notify(error.response.data, "err");
      }
    } else notify("Email Not Verified", "war");
  };
  //console.log(user);
  return (
    <div className="signup--container">
      <div className="signup">
        <span className="title">Signup</span>
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
        <form onSubmit={submitData}>
          <div className="name">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              value={user.fullName}
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              required
              onChange={handleChange}
              value={user.email}
            />
            <button onClick={getOtp}>Get Otp</button>
          </div>
          {getotp ? (
            <div className="email--verification">
              <label htmlFor="otp">OTP Verification</label>
              <input
                type="text"
                name="otp"
                id="otp"
                placeholder="otp"
                required
                onChange={(e) => setUserotp(e.target.value)}
              />
              <button onClick={verifyOtp}>
                {emailVerified ? "verified" : "Verify"}
              </button>
            </div>
          ) : <></>}
          <div className="mobile">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              name="mobileNum"
              id="mobile"
              placeholder="mobile number"
              required
              onChange={handleChange}
              value={user.mobileNum}
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
            <button type="submit">Create Account</button>
          </div>
        </form>
        <div className="altnate">
          <span>Already have account with us</span>
          <NavLink to={"/login"}>
            <button>Login</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
