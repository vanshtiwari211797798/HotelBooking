import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from './Login'


const PvtUserComponent = () => {
    const auth = localStorage.getItem("usertoken")
    return auth ? <Outlet /> : <Login />
}

export default PvtUserComponent