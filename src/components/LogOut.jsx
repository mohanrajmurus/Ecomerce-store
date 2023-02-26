import React from 'react'
import {useDispatch} from 'react-redux'
const LogOut = () => {
  const dispatch = useDispatch();
  return (
    <div onClick={()=> dispatch({type:'REMOVE_USER',payload:{}})}>LogOut</div>
  )
}

export default LogOut