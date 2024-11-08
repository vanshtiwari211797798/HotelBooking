import React from 'react'
import {Outlet, Navigate } from 'react-router-dom'



const AdminPvtComp = () => {
    const auth = localStorage.getItem('admintoken')

    
    return auth ? <Outlet /> : <Navigate to={`/login`} />
}

export default AdminPvtComp