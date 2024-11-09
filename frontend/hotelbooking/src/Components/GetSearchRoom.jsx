import React from 'react';
import '../Style/Room_Detail.css';
import { useLocation, Link } from 'react-router-dom';


const GetSearchRoom = () => {


    const location = useLocation();
    const {data} = location.state || {};

  return (
    <div>
            <div className="Room-container">
                <div className="Our-Luxurious">
                    <h2>Our Rooms</h2>
                    <p>
                        <Link className='a' to="/">Home</Link>
                    </p>
                </div>
                <div className="Roomcard-container">
                    {
                        data.length > 0 ? 
                        data.map((item) => {
                            return (
                                <div className="room-card" key={item._id} data-aos="fade-right">
                                    <div className="room-img">
                                        <img src={`http://localhost:3000/${item.room_image}`} alt="room image" title='room image' />
                                    </div>
                                    <div className="room-contents">
                                        <div className="room-discript">
                                            <h2>{item.room_category}</h2>
                                            <p>
                                                {item.room_description}
                                            </p>
                                        </div>
                                        <div className="room-book">
                                            <Link className='a' to={`/detail_room/${item._id}`}>BOOK NOW</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        "NO ROOM AVAILABLE"
                    }
                </div>
            </div>
    </div>
  )
}

export default GetSearchRoom