import React from 'react';
import { Link } from 'react-router-dom';
// import '../Style/Home.css';a


const Footer = () => {
  return (
    <>
                  {/* Footer section start */}
                  <footer className="footer">
            <div className="f_1">
              <h2>Newsletter</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
                distinctio pariatur modi saepe quae soluta quisquam, ipsam, velit nam
                quod voluptas, facilis magni consequatur praesentium earum
                exercitationem ea repellendus repudiandae.
              </p>
            </div>
            <div className="f_2">
              <h2>Explore</h2>
              <ul>
                <li>
                  <Link to="/about">
                    <i className="fas fa-angle-right me-2" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contactus">
                    <i className="fas fa-angle-right me-2" />
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="f_1">
              <h2>Contact Info</h2>
              <ul>
                <li>
                  <Link to="https://maps.app.goo.gl/2ER5FbBjeA94M1ce7">
                    <i className="fa fa-map-marker-alt me-2" />
                    Darshan Nagar, Ayodhya U.P
                  </Link>
                </li>
                <li>
                  <Link to="mailto:techsimahotel@gmail.com">
                    <i className="fas fa-envelope me-2" />
                    techsimatraining@gmail.com
                  </Link>
                </li>
                <li>
                  <Link to="tel:+918303280240">
                    <i className="fas fa-phone me-2" />
                    +91 9889828629
                  </Link>
                </li>
              </ul>
              <div className="icon">
                <i className="fa-brands fa-facebook" />
                <i className="fa-brands fa-twitter" />
                <i
                  style={{
                    background:
                      "linear-gradient(35deg,yellow,yellow,red,/fc04ba,/c907ff)"
                  }}
                  className="fa-brands fa-instagram"
                />
                <i className="fa-brands fa-linkedin" />
              </div>
            </div>
            <div className="f_3">
              <h3>Popular Post</h3>
              <h2>INVESMENT</h2>
              <p>Revisiting Your Investment &amp; Distribution Goals</p>
              <h2>BUSINESS</h2>
              <p>Dimensinal Fund Advisor Interview with Director</p>
            </div>
          </footer>
          {/* Footer section end */}
    </>
  )
}

export default Footer