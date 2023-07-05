import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
const PrivateRouters = () => {
  const user = useSelector(state => state.user)
  const auth = {token: Object.keys(user).length? true:false};
  return auth.token ? <Outlet/>:<Navigate to='/login'/>
}

export default PrivateRouters