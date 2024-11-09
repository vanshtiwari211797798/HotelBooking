import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../Style/TypesRoom.css'
import {ThreeDots} from 'react-loader-spinner'


const TypesRoom = () => {

    const [getCategoryRooms, setGetCategoryRooms] = useState([]);
    const [loader, setLoader] = useState(false);

    const { roomType } = useParams();

    const getCategoryRoom = async () => {
      
        try {
            // when setloader true then loader start 
            setLoader(true)
            const res = await fetch(`http://localhost:3000/client/get-types-room/${roomType}`, {
                method: "GET"
            })

            if (res.status === 200) {
                const finalRes = await res.json();

                setGetCategoryRooms(finalRes.category);
            }
            setLoader(false)
        } catch (error) {
            console.error('error from get category room', error);

        }
    }


    useEffect(() => {
       
        getCategoryRoom();
    }, [])


    return (
        <>
            <div className="Room-container">
                <div className="Our-Luxurious">
                    <h2>Our {roomType} Rooms</h2>
                    <p>
                        <Link className='a' to="/">Home</Link>
                    </p>
                </div>
                <div className="Roomcard-container">
                    {
                        loader ? <ThreeDots/ > :
                        getCategoryRooms.length > 0 ? 
                        getCategoryRooms.map((item) => {
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
        </>

    )
}

export default TypesRoom