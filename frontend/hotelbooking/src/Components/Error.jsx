import React from 'react'
import NotFound from '../Images/NotFound-unscreen.gif'; 
import Header from './Header';
import Footer from './Footer';

const Error = () => {
  return (
    <>
        <div className="not_found" style={{width:"100%",display:"flex", justifyContent:"center", alignItems:"center"}}>
            <img src={NotFound} alt="page not found" title='page not found'/>
        </div>

    </>
  )
}

export default Error