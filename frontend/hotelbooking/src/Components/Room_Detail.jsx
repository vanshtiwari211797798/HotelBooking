import React, { useEffect, useState } from 'react';
import '../Style/Room_Detail.css';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';



const Room_Detail = () => {

    let todayDateTime = new Date();
    let date = todayDateTime.toLocaleDateString();
    let time = todayDateTime.toLocaleTimeString();


    const navigate = useNavigate();
    const { id } = useParams();

    const [room, setRoom] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [Profile, setProfile] = useState('');


    useEffect(() => {

        const getRoomById = async () => {

            try {
                const res = await fetch(`http://localhost:3000/client/get-room/${id}`, {
                    method: "GET"
                })

                if (res.status === 200) {
                    const roomDetail = await res.json();
                    setRoom(roomDetail.Room);

                }
            } catch (error) {
                console.error('Error from get room by id', error);
            }

        }



        const myProfile = async () => {

            try {
                const res = await fetch(`http://localhost:3000/client/user-profile`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('usertoken')}`
                    }
                })

                if (res.status === 200) {
                    const final_res = await res.json();

                    setProfile(final_res.profile)
                }
            } catch (error) {
                console.error('error from show profile data', error);
            }
        }

        getRoomById();

        if (localStorage.getItem('usertoken')) {
            myProfile();
        }

    }, [])

    const increaseQuantity = () => {
        if (quantity > 4) {
            toast.info('Only 5 room can add once, for more contact/visit to hotel')
        } else {
            setQuantity(quantity + 1);
        }

    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            toast.info('Minimum one room required')
        }
    };


    // for set price of the room
    const price = (room.room_price) * quantity;

    // console.log()

    // for booking room

    const bookNow = async (e) => {
        e.preventDefault();
        try {

            if (localStorage.getItem('usertoken')) {
                const book = {
                    room_number: room.room_number,
                    room_category: room.room_category,
                    room_image: room.room_image,
                    room_description: room.room_description,
                    room_price: price,
                    total_beds: room.total_beds,
                    capacity: room.capacity,
                    fname: Profile.fname,
                    lname: Profile.lname,
                    email: Profile.email,
                    phone: Profile.phone,
                    aadhar_number: Profile.aadhar_number,
                    number_of_rooms: quantity,
                    booking_date: `${date} / ${time}`

                }


                if (room.room_booking_status === 'available') {
                    const res = await fetch(`http://localhost:3000/client/book-room`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('usertoken')}`
                        },
                        body: JSON.stringify(book)
                    })

                    if (res.status == 201) {
                        toast.success("Room Booked Successfully");
                        navigate('/booking')
                    } else {
                        toast.error('Somethings Went Wrong, try again later');
                        // navigate('/');
                    }


                } else {
                    toast.info('This room is not available for booking');
                }

            } else {
                navigate("/login");
            }

        } catch (error) {
            console.error('error from book now room', error);
        }
    }

    return (
        <>
            <div className="room-details">
                <div className="image-container">
                    <img src={`http://localhost:3000/${room.room_image}`} className="room-image" alt={'room Image'} title={`Room number ${room.room_number}`} />
                </div>

                <div className="details-container">
                    <h2 className="room-title">Room Number: {room.room_number}</h2> {room.room_booking_status === 'available' ? <span className='room-status'>({room.room_booking_status})</span> : <span className='room-status' style={{ color: "red" }}>({room.room_booking_status})</span>}
                    <h3 className="room-category">{room.room_category}</h3>
                    <p className="room-description">{room.room_description}</p>
                    <p className="room-price">Price: <span>₹{price}</span> / night</p>
                    <p className="room-beds">Total Beds: {room.total_beds}</p>
                    <p className="room-capacity">Capacity: {room.capacity}</p>

                    <div className="quantity-control">
                        <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                        <span className="quantity">{quantity}</span>
                        <button className="quantity-button" onClick={increaseQuantity}>+</button>
                        <span className="add-room-text">Add Room(s): {quantity}</span>
                    </div>

                    <button className="book-now-button" onClick={bookNow}>Book Now</button>
                </div>
            </div>
        </>
    );
}

export default Room_Detail;
