import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextInput from "../components/TextInput";
import axios from "axios";
import BillCal from "../components/BillCal";
import SingleCartData from "../components/SingleCartData";
const url = process.env.REACT_APP_SERVER_URL;

const CheckOutPage = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch();
  const [address, setaddress] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [delAddress, setDelAddress] = useState({
    doorNo: "",
    city: "",
    streetName: "",
    landmark: "",
    location: "",
    pincode: "",
  });
  useEffect(() => {
    setaddress(user.address);
  }, [user]);
  //console.log(address);
  const handleChange = (e) => {
    setDelAddress({
      ...delAddress,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(`${url}/address/${user._id}`, delAddress);
    dispatch({
      type: "SET_USER",
      payload: data,
    });
    setDelAddress({
      doorNo: "",
      city: "",
      streetName: "",
      landmark: "",
      location: "",
      pincode: "",
    });
  };
  return (
    <div className="checkout--container">
      <div className="address--container">
          <div className="basic--details">
            <span>{user.fullName}</span>
            <span>{user.mobileNum}</span>
          </div>
          <div className="address">
            {address.doorNo === null ||
            address.city === null ||
            address.streetName === null ||
            address.landmark === null ||
            address.location === null ||
            address.pincode === null ? (
              <div className="add--address">
                <button className="add--btn" onClick={() => setIsOpen(true)}>
                  Add Address
                </button>
                {isOpen ? (
                  <div className="new-address">
                    <form onSubmit={handleSubmit}>
                      <TextInput
                        type={"text"}
                        name="doorNo"
                        value={delAddress.doorNo}
                        placeholder="Enter Door Number"
                        onChange={handleChange}
                      />
                      <TextInput
                        type={"text"}
                        name="streetName"
                        value={delAddress.streetName}
                        placeholder="Enter Street Name"
                        onChange={handleChange}
                      />
                      <TextInput
                        type={"text"}
                        name="location"
                        value={delAddress.location}
                        placeholder="Enter Location"
                        onChange={handleChange}
                      />
                      <TextInput
                        type={"text"}
                        name="landmark"
                        value={delAddress.landmark}
                        placeholder="Enter LandMark"
                        onChange={handleChange}
                      />
                      <TextInput
                        type={"text"}
                        name="city"
                        value={delAddress.city}
                        placeholder="Enter City"
                        onChange={handleChange}
                      />
                      <TextInput
                        type={"text"}
                        name="pincode"
                        value={delAddress.pincode}
                        placeholder="Enter Pincode"
                        onChange={handleChange}
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
        <div className="cart--product">
      <div className='cart--items'>
        {cart.map((item,i)=>{
            return <SingleCartData item={item} key={i}/>
        })}
    </div>
      </div>
        <div className="price--container">
          <BillCal />
        </div>
      
    </div>
  );
};

export default CheckOutPage;
