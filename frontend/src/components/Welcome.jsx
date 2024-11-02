import React from 'react'
import { useSelector } from 'react-redux'
import Logo2 from '../Logo.png'

const Welcome = () => {
  const {user} = useSelector((state) => state.auth);
  return (
    <div>
        <h1 className='title'>Dashboard</h1>
        <h2 className='subtitle'>Welcome Back...<strong>{user &&  user.name}</strong></h2>
        <img src={Logo2} width="auto" height="auto" alt="logo"  />
    </div>
  )
}

export default Welcome