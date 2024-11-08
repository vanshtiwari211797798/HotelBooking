import React from 'react'
// import '../Style/Home.css'
import { Link } from 'react-router-dom'


const Header = () => {

  const auth = localStorage.getItem("usertoken")

  $(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop()>50) {
            $('.header').addClass('sticky');
        } else {
            $('.header').removeClass('sticky');
        }
    });
});
// ===============================
function toggleNav() {
    var extraNavbar = document.querySelector('.extra-navbar');
    if (extraNavbar.style.display === "none" || extraNavbar.style.display === "") {
        extraNavbar.style.display = "block";
    } else {
        extraNavbar.style.display = "none";
        

    }
}
  
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
                  <Link to={"/contactus"}>Contact</Link>
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
            <div className="toggle-btn" onClick={toggleNav}>
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