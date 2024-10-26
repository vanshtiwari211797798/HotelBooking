import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'



const PvtUserComponent = () => {
    const auth = localStorage.getItem("usertoken")
    return auth ? <Outlet /> : <Navigate to={'/login'} />
}

export default PvtUserComponent