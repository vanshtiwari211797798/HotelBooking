import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Rooms = () => {
    // State to store room data, loading status, and errors
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getRoom = async () => {
        try {
            const res = await fetch(`http://localhost:3000/client/get-rooms`, {
                method: "GET"
            });

            if (res.status === 200) {
                const AllRooms = await res.json();
                if (AllRooms.Room) {
                    setRooms(AllRooms.Room); 
                } else {
                    setError('No rooms found'); 
                }
            } else {
                setError('Failed to fetch rooms'); 
            }
        } catch (error) {
            console.error('Error from getRoom:', error);
            setError('Error fetching rooms'); 
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        getRoom(); // Fetch rooms when the component mounts
    }, []);

    if (loading) {
        return <p>Loading rooms...</p>; // Show loading message
    }

    if (error) {
        return <p>{error}</p>; // Show error message
    }

    return (
        <div className="inner3">
            <div className="inner3-1n1">
                <div className="inner3-in1-in1">
                    <h3>---: Room :---</h3>
                    <h2>Our Rooms</h2>
                </div>
                <div className="inner3-in1-in2">
                    <p>
                        Our rooms offer a harmonious blend of comfort and elegance, designed
                        to provide an exceptional stay for every guest. Each room features
                        plush bedding, high-quality linens, and a selection of pillows to
                        ensure a restful night's sleep.
                    </p>
                </div>
            </div>
            <div className="rooms-outer">
                {rooms.map((item) => (
                    <Link className='Link' to={`/detail_room/${item._id}`} key={item.room_number}>
                        <div className="inner3-1n2">
                            <div className="inner3-1n2-in1">
                                <img 
                                    src={`http://localhost:3000/${item.room_image}`} 
                                    alt="Room" 
                                    title={`Room Number ${item.room_number}`} 
                                />
                                <h3 className='Room-categ'>{item.room_category} {item.room_booking_status === 'available' ? <span className='room-status'>{(item.room_booking_status)}</span> : <span style={{color:"red"}}>{(item.room_booking_status)}</span>}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Rooms;
