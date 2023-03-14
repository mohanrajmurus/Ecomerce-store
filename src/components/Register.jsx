import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const url = process.env.REACT_APP_SERVER_URL;

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  //error message while login
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [sucessMessage, setSucessMessage] = useState(undefined);
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
  console.log(userotp);
  console.log(otp);
  const getOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${url}/emailverify`, {
        email: user.email,
      });
      if (data) {
        setSucessMessage("OTP sent to email");
        setOtp(data);
        setGetotp(true);
      }
    } catch (err) {
      setErrorMessage(err.response.data);    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === Number(userotp)) {
      setEmailVerified(true);
      setSucessMessage('Email Id verification sucessfull')
    }
  };
  const submitData = async (e) => {
    e.preventDefault();
    if (emailVerified) {
      try {
        //prevent reload while submit form data

        const res = await axios.post(`${url}/register`, user);
        const data = await res.data;
        //console.log(data);
        if (data) {
          navigate("/login");
        }
        //reset values
        setUser({
          fullName: "",
          email: "",
          password: "",
        });
      } catch (error) {
        setErrorMessage(error.response.data);
      }
    } else setErrorMessage("Email Not Verified");
  };
  //console.log(user);
  return (
    <div className="signup--container">
      <div className="signup">
        <span className="title">Signup</span>
        {errorMessage && <span className="error--message">{errorMessage}</span>}
        {sucessMessage && (
          <span className="sucess--message">{sucessMessage}</span>
        )}
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
          ) : null}
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
