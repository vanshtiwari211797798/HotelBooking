import React from 'react'
import { Link } from 'react-router-dom'
import '../Style/TypesRoom.css'
import room from '../Images/1.jpg'


const TypesRoom = () => {
  return (
    <>
  <div className="Room-container">
    <div className="Our-Luxurious">
      <h2>Our Luxurious Rooms</h2>
      <p>
        <Link className='a' to="/">Home</Link>
      </p>
    </div>
    <div className="Roomcard-container">
      <div className="room-card">
        <div className="room-img">
          <img src={room} alt="" srcSet="" />
        </div>
        <div className="room-content">
          <div className="room-discript">
            <h2>Deluxe Room</h2>
            <p>
              Labore quibusdam tempore error ex non, vero rerum voluptate
              architecto, molestias consequuntur debitis, possimus quasi.
              tempore harum culpa aperiam quia.
            </p>
          </div>
          <div className="room-book">
            <Link className='a' to="">BOOK NOW</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  )
}

export default TypesRoom