import React from 'react'
// import '../Style/Home.css'
import { Link } from 'react-router-dom'


const Header = () => {

  const auth = localStorage.getItem("usertoken")
  
  return (
    <>
         <header className="header">
            <div className="logo">
              <span>HOTEL</span>
            </div>
            <div className="navbar">
              <ul>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/about"}>About</Link>
                </li>
                <li>
                  <Link to={"/gallery"}>Gallery</Link>
                </li>
                <li>
                  <Link to={"/contact"}>Contact</Link>
                </li>
                <li>
                  <Link to={"/booking"}>Booking</Link>
                </li>
                <li>
                  {auth ? <Link to={'/profile'}>👤</Link> : <Link to={"/login"}>Signin</Link> } 
                </li>
              </ul>
            </div>
            {/* onClick="toggleNav" */}
            <div className="toggle-btn" >
              <i className="fa fa-bars" />
            </div>
          </header>
          <div className="extra-navbar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                  <Link to="/contact">Contact</Link>
                </li>
              <li>
                  <Link to="/booking">Booking</Link>
                </li>
              <li>
              {auth ? <Link to={'/profile'}>👤</Link> : <Link to={"/login"}>Signin</Link> } 
              </li>
            </ul>
          </div>
    </>
  )
}

export default Header