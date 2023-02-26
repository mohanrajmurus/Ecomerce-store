import React from 'react'
import {useSelector} from 'react-redux'
import SingleCartData from './SingleCartData';

const Cart = () => {
    const cartData = useSelector(state=>state.cart)
    //console.log(cartData);
  return (
    <div className='cart--items'>
        {cartData.map((item,i)=>{
            return <SingleCartData item={item} key={i}/>
        })}
    </div>
  )
}

export default Cart