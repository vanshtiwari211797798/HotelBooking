import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Style/Home.css'
import author from '../Images/user.jpg'
import {toast} from 'react-toastify'
import Facility from './Facility'
import Category from './Category'




const Home = () => {

  
  const navigate = useNavigate();

  // state for room search
  const [booking_check_in_date, setbooking_check_in_date] = useState('');
  const [booking_check_out_date, setbooking_check_out_date] = useState('');

  // for subscribe email state
  const [subscribe, setSubsCribe] = useState('');

  // subscribe website api fetch
  const subsCribeNow = async () => {
    try {
      if(subscribe){
        const res = await fetch(`https://hotelbooking-zs0a.onrender.com/client/subscribe-now`,{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({email:subscribe})
        })

        if(res.status === 201){
          toast.success("Subscribe successfully, thank you")
          setSubsCribe("")
        }else if(res.status === 400){
          toast.info("Email is required");
        }else{
          toast.error("Internal server error");
          setSubsCribe("")
        }
      }else{
        toast.error("Please enter email");
      }
    } catch (error) {
      console.error('error from subscribe website', error);   
    }
  }

  

  // for handling room search
  const handleDateChange = (e) => {
    const selectedDate = e.target.value
    setbooking_check_in_date(selectedDate);

  }


  const handleSearchRoom = async (e) => {
    e.preventDefault(); 
  
    try {
      if(booking_check_in_date && booking_check_out_date){
      // roomSearch object convert to url paramiter
      
      const queryParams = new URLSearchParams({
        booking_check_in_date,
        booking_check_out_date,
      }).toString();


      const res = await fetch(`http://localhost:3000/client/get-available-rooms?${queryParams}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (res.status === 200) {
        const finalRes = await res.json();
        navigate('/search_rooms',{state:{data:finalRes.available_rooms}})
      }
    }else{
      toast.info("Please fill dates")
    }
    } catch (error) {
      console.error('Error from search room', error);
    }
  }
  



  return (
    <>
      {/* <Header /> */}
      <div className="h-outer">
        {/* hero section start */}
        <div className="h-hero">
          <div className="h-hero-content">
            <span> Welcome to Our Hotel</span>
            <h1>Luxury Stay Hotel Experience Comfort &amp; Elegance</h1>
            <p>
              Choosing Bokinn was one of the best decisions we've ever made. They
              have proven to be a reliable and innovative partner
            </p>
            {/* <Link to="/">Discover Room</Link> */}
          </div>
          <div className="home_container">
            {/* <div className="form-group">
              <label htmlFor="destination">Enter a destination </label>
              <input
                type="text"
                id="destination"
                placeholder="Enter a destination "
              />
            </div> */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="checkin">Check-in</label>
                <input type="date" id="booking_check_in_date" name='booking_check_in_date' value={booking_check_in_date} onChange={handleDateChange} required/>
              </div>
              <div className="form-group">
                <label htmlFor="checkout">Check-out</label>
                <input type="date" id="booking_check_out_date" name='booking_check_out_date' value={booking_check_out_date} onChange={(e) => setbooking_check_out_date(e.target.value)} min={booking_check_in_date} required/>
              </div>
            </div>
            <button className="search-btn" onClick={handleSearchRoom}>SEARCH</button>
          </div>
        </div>
        {/* hero section end */}
        {/* about section start */}
        <div className="inner1" >
          <div className="inner1-in1" />
          <div className="inner1-in2">
            <h3> About Us</h3>
            <h2>Welcome To Our Moonlit Hotel &amp; Resort</h2>
            <p>
              Welcome to Techsima Hotels, where luxury meets comfort in the heart of Ayodhya U.P.
              Since 2021, we have been dedicated to providing an exceptional stay
              for our guests, blending modern amenities with timeless elegance.Our
              beautifully designed rooms and suites offer stunning views and plush
              accommodations, ensuring a restful retreat whether you're here for
              business or leisure.
            </p>
            <input type="button" defaultValue="Learn More" onClick={() => navigate('/about')}/>
          </div>
        </div>
        {/* about section end */}
        {/*Facilities section start */}
        <Facility />
        {/*Facilities section end */}
      </div>
      {/* Category start */}
            <Category />
      {/* category end */}
      {/* Testimonial section start */}
      <div className="inner4">
        <div className="inner4-in1">
          <h3>Testimonial</h3>
          <h2>What Our Client Say</h2>
        </div>
        <div className="inner4-in2">
          <div className="inner4-in2-in1">
            <img src={author} alt="client" title='Client' />
          </div>
          <div className="inner4-in2-in2">
            <p>
              Choosing Bokinn was one of the best decisions we've ever made. They
              have proven to be a reliable and innovative partner, always ready to
              tackle new challenges with and expertise.Their commitment to and
              delivering tailored.
            </p>
            <h2>
              <i className="fa-solid fa-star" />
              <i className="fa-solid fa-star" />
              <i className="fa-solid fa-star" />
              <i className="fa-solid fa-star" />
              <i className="fa-solid fa-star-half-stroke" />
            </h2>
          </div>
        </div>
      </div>
      {/* Testimonial section end */}
      {/* Video section start */}
      <div className="inner5">
        <div className="inner5-content">
          <div className="inner5-round">
            <div className="inner5-trian">
              <Link to="https://youtu.be/sfczxZvp2c4?si=Qm5fhOk_tvEs_e16">
              <i class="fa fa-play" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Video section end */}
      {/* offer section start */}
      <div className="inner6">
        <div className="inner6-in1">
          <h3>Special Offer</h3>
          <h2>Special Offer</h2>
        </div>
        <div className="inner6-in2">
          <div className="inner6-in2-in1">
            <div className="inner6-in1-img">
              <div className="inner6-in1-img-in">
                <h2>50% OFF</h2>
              </div>
            </div>
            <div className="inner6-in1-con">
              <h2>Twin Or Double Room</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
                cum unde et laudantium! Voluptas tempore quia perferendis labore
                quisquam sed sit laboriosam. Corporis, dolores officiis.
              </p>
            </div>
          </div>
          <div className="inner6-in2-in2">
            <div className="inner6-in21">
              <div className="inner6-in21-img">
                <div className="inner6-in21-img-in">
                  <h2>50% OFF</h2>
                </div>
              </div>
              <div className="inner6-in21-con">
                <h2>Room With A View</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
                  cum unde et laudantium! Voluptas tempore quia perferendis labore
                  quisquam sed sit laboriosam. Corporis, dolores officiis.
                </p>
              </div>
            </div>
            <div className="inner6-in22">
              <div className="inner6-in22-img">
                <div className="inner6-in22-img-in">
                  <h2>50% OFF</h2>
                </div>
              </div>
              <div className="inner6-in22-con">
                <h2>Deluxe Room</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
                  cum unde et laudantium! Voluptas tempore quia perferendis labore
                  quisquam sed sit laboriosam. Corporis, dolores officiis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* offer section end */}
      {/* Instra section start */}
      <div className="inner7">
        <div className="inner7-in1">
          <h3>Instagram Post</h3>
          <h2>Follow on Instagram</h2>
        </div>
        <div className="inner7-in2">
          <div className="inner7-in2-img1">
            <div className="inner7-con" />
          </div>
          <div className="inner7-in2-img2">
            <div className="inner7-con" />
          </div>
          <div className="inner7-in2-img3">
            <div className="inner7-con" />
          </div>
          <div className="inner7-in2-img4">
            <div className="inner7-con" />
          </div>
          <div className="inner7-in2-img5">
            <div className="inner7-con" />
          </div>
        </div>
      </div>
      {/* Instra section end */}
      {/* Newsletter section start */}
      <div className="inner8">
        <div className="inner8-in1">
          <h2>Join Our Newsletter</h2>
        </div>
        <div className="inner8-in2">
          <input
            className="email"
            type="email"
            name='email'
            placeholder="Enter your email"
            value={subscribe}
            onChange={(e) => setSubsCribe(e.target.value)}
            
          />
          <input className="Subs" type="button" defaultValue="Subscribe" onClick={subsCribeNow}/>
        </div>
      </div>
      {/* Newsletter section end */}


      {/* jquery start */}
      {/* jquery end */}
      {/* java script section start */}
      {/* java script section start */}

    </>


  )
}

export default Home