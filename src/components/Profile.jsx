import React from 'react'
import LogOut from './LogOut'
const Profile = () => {
  return (
    <div className='profile--container'>
      <img src='https://cdn-icons-png.flaticon.com/512/6522/6522516.png' alt='profile'/>
      <ul className="profile--menu">
        <li className="items">My Profile</li>
        <li className="items">Orders</li>
        <li className="items"><LogOut/></li>
      </ul>
    </div>
  )
}

export default Profile