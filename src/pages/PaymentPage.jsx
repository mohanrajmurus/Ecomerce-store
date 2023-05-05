import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PaymentPage = () => {
  const cartData = useSelector((state) => state.cart);
  const [orgPrice, setOrgPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    const currPrice = cartData.reduce(
      (acc, curr) =>
        (acc +=
          Math.floor(Number(curr.price) * 50) * curr.qty -
          (Math.floor(Number(curr.price) * 50) *
            curr.qty *
            curr.discountPercentage) /
            100),
      0
    );
    const originalPrice = cartData.reduce(
      (acc, curr) => (acc += Math.floor(Number(curr.price) * 50) * curr.qty),
      0
    );
    setOrgPrice(Math.floor(originalPrice));
    setDiscountPrice(Math.floor(currPrice));
  }, [cartData]);
  return (
    <div className="paymentpage__container">
      <div className="paymentpage--wrapper">
        <div className="total--price">
          <span> Total Amount: ₹ {orgPrice - (orgPrice - discountPrice)}</span>
        </div>
        <div className="payment--details__container">
          <span>card Details</span>
          <button>PayNow</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
