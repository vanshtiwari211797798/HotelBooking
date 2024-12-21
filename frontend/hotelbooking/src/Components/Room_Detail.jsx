import React, { useEffect, useState } from 'react';
import '../Style/Room_Detail.css';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

const Room_Detail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    
    const [loader, setLoader] = useState(false);
    const [room, setRoom] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [profile, setProfile] = useState('');
    const [booking_check_in_date, setbooking_check_in_date] = useState('');
    const [booking_check_out_date, setbooking_check_out_date] = useState('');

   

    let todayDateTime = new Date();
    let date = todayDateTime.toLocaleDateString();
    let time = todayDateTime.toLocaleTimeString();

    useEffect(() => {
        const getRoomById = async () => {
            setLoader(true);
            try {
                const res = await fetch(`https://hotelbooking-zs0a.onrender.com/client/get-room/${id}`, {
                    method: 'GET'
                });
                if (res.status === 200) {
                    const roomDetail = await res.json();
                    setRoom(roomDetail.Room);
                }
                setLoader(false);
            } catch (error) {
                console.error('Error from get room by id', error);
            }
        };

        const myProfile = async () => {
            try {
                const res = await fetch(`https://hotelbooking-zs0a.onrender.com/client/user-profile`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('usertoken')}`
                    }
                });
                if (res.status === 200) {
                    const final_res = await res.json();
                    setProfile(final_res.profile);
                }
            } catch (error) {
                console.error('Error from show profile data', error);
            }
        };

        getRoomById();
        if (localStorage.getItem('usertoken')) {
            myProfile();
        }
    }, [id]);


    // booking check in date dandle change

    const checkInDatehandleChange = (e) => {
        const selectedCheckIndate = e.target.value
        setbooking_check_in_date(selectedCheckIndate);
    }

    const increaseQuantity = () => {
        if (quantity > 4) {
            toast.info('Only 5 rooms can be added at once; for more, contact/visit the hotel.');
        } else {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            toast.info('Minimum one room required');
        }
    };

    const price = (room.room_price) * quantity;

    const bookNow = async (e) => {
        e.preventDefault();
        
        try {
            
            if (localStorage.getItem('usertoken')) {
                if(room.room_booking_status === 'available'){
                if(booking_check_in_date && booking_check_out_date){
                const book = {
                    room_number: room.room_number,
                    room_category: room.room_category,
                    room_image: room.room_image,
                    room_description: room.room_description,
                    room_price: price,
                    total_beds: room.total_beds,
                    capacity: room.capacity,
                    fname: profile.fname,
                    lname: profile.lname,
                    email: profile.email,
                    phone: profile.phone,
                    aadhar_number: profile.aadhar_number,
                    number_of_rooms: quantity,
                    booking_check_in_date:booking_check_in_date,
                    booking_check_out_date:booking_check_out_date,
                    booking_date:`${date} || ${time}`
                };

                
                    const res = await fetch(`https://hotelbooking-zs0a.onrender.com/client/book-room`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('usertoken')}`
                        },
                        body: JSON.stringify(book)
                    });

                    if (res.status === 201) {
                        toast.success('Room booked successfully');
                        navigate('/booking');
                    }else if(res.status === 401){
                        toast.info("Room is unavailable on this date");
                    } else {
                        toast.error('Something went wrong, try again later.');
                    }
                }else{
                    toast.error("Check Check In and Check Out Date");
                }
            }else{
                toast.error("Room is currently unavailable")
            }
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error from book now room', error);
        }
    };

    return (
        <>
            <div className="room-details">
                {loader ? (
                    <div style={{ margin: '100px auto' }}>
                        <ThreeDots />
                    </div>
                ) : (
                    <>
                        <div className="image-container">
                            <img
                                src={`https://hotelbooking-zs0a.onrender.com/${room.room_image}`}
                                className="room-image"
                                alt="Room"
                                title={`Room number ${room.room_number}`}
                            />
                        </div>

                        <div className="details-container">
                            <h2 className="room-title">
                                Room Number: {room.room_number}{' '}

                            </h2>
                            <h3 className="room-category">{room.room_category}</h3>
                            <p className="room-description">{room.room_description}</p>
                            <p className="room-price">
                                Price: <span>₹{price}</span> / night
                            </p>
                            <p className="room-beds">Total Beds: {room.total_beds}</p>
                            <p className="room-capacity">Capacity: {room.capacity}</p>

                            {/* Check-in and Check-out Date Inputs */}
                            <div className="date-inputs">
                                <label>
                                    Check-in Date:
                                    <input
                                        type="date"
                                        value={booking_check_in_date}
                                        onChange={checkInDatehandleChange}
                                        name='booking_check_in_date'
                                    />
                                </label>
                                <label>
                                    Check-out Date:
                                    <input
                                        type="date"
                                        value={booking_check_out_date}
                                        onChange={(e) => setbooking_check_out_date(e.target.value)}
                                        name='booking_check_out_date'
                                        min={booking_check_in_date}
                                    />
                                </label>
                            </div>

                            {/* Quantity Control */}
                            <div className="quantity-control">
                                <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                                <span className="quantity">{quantity}</span>
                                <button className="quantity-button" onClick={increaseQuantity}>+</button>
                                <span className="add-room-text">Add Room(s): {quantity}</span>
                            </div>

                            <button className="book-now-button" onClick={bookNow}>Book Now</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Room_Detail;
