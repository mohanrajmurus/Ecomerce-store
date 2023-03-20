import React, { useEffect, useState } from "react";
import axios from "axios";
import TextInput from "../components/TextInput";
import { useSelector } from "react-redux";
const CheckOut = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [address, setaddress] = useState({});
  useEffect(() => {
    setaddress(user.address);
  }, []);

  //const address = user.address;
  //console.log(address);
  //console.log(user);
  const handleChnage = (e) => {
    //console.log(e.target.value)
    setaddress({
      ...address,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(address)
  }
  return (
    <div className="checkout--container">
      <div className="address--conatiner">
        <span className="title">delivery address</span>
        <div className="address--bar">
          <div>
            <span className="name">{user.fullName}</span>
            <span className="mobile">{user.mobileNum}</span>
          </div>
          {Object.keys(user.address).length ? (
            <div className="add-address">
              <button onClick={() => setIsOpen(!isOpen)}>Add Address</button>
              {isOpen ? (
                <div className="new-address">
                  <form onSubmit={handleSubmit}>
                    <TextInput
                      type={"text"}
                      name="doorNo"
                      value={address.doorNo}
                      placeholder="Enter Door Number"
                      onChange={handleChnage}
                    />
                     <TextInput
                      type={"text"}
                      name="streetName"
                      value={address.streetName}
                      placeholder="Enter Street Name"
                      onChange={handleChnage}
                    />
                     <TextInput
                      type={"text"}
                      name="location"
                      value={address.location}
                      placeholder="Enter Location"
                      onChange={handleChnage}
                    />
                     <TextInput
                      type={"text"}
                      name="city"
                      value={address.city}
                      placeholder="Enter City"
                      onChange={handleChnage}
                    />
                     <TextInput
                      type={"text"}
                      name="pincode"
                      value={address.pincode}
                      placeholder="Enter Pincode"
                      onChange={handleChnage}
                    />
                    <button type="submit">Save</button>
                  </form>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div className="address--details">
              <span>{address.doorNo},</span>
              <span>{address.streetName},</span>
              <span>{address.location},</span>
              <span>{address.city},</span>
              <span>Landmark:{address.landmark},</span>
              <span>Pincode:{address.pincode}.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
