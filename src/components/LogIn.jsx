import React, { useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch} from 'react-redux'

const url = process.env.REACT_APP_SERVER_URL;

console.log(url);
const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //error message while login
  const [errorMessage,setErrorMessage] = useState(undefined);
  //get input from user
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitData = async (e) => {
    //prevent reload while submit form data
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/login`, user);
    const data = await res.data;
    //console.log(data);
    //store user details to redux store
    //s
    dispatch({
      type:'SET_USER',
      payload:data
    })
    navigate('/')
    
    //reset values
    setUser({
      email: "",
      password: "",
    });
    } catch (error) {
      //console.log(error);
      if(await error.response)
        setErrorMessage(await error.response.data);
      else
        setErrorMessage('Server Error')
    }
  };
  return (
    <div className="login--container">
      
      <div className="login">
        <span className="title">Login</span>
        {errorMessage && <span className="error--message">{errorMessage}</span>}
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
