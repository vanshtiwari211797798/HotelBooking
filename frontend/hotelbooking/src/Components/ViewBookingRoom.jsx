import React, { useEffect, useState } from 'react';
import '../Style/Room_Detail.css';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'


const ViewBookingRoom = () => {




  const navigate = useNavigate();
  const { id } = useParams();

  const [room, setRoom] = useState('');
  const [roomNum, setRoomNum] = useState()
  const [quantity, setQuantity] = useState();
  const [Profile, setProfile] = useState('');
  const [originalPrice, setOrigionalPrice] = useState()

  useEffect(() => {

    // this get method function get the room details fetched by id (id will received to the pramiter url)
    const getRoomById = async () => {

      try {
        const res = await fetch(`http://localhost:3000/client/get-room/${id}`, {
          method: "GET"
        })

        if (res.status === 200) {
          const roomDetail = await res.json();
          setRoom(roomDetail.Room);
          setRoomNum(roomDetail.Room.room_number)
          setQuantity(roomDetail.Room.number_of_rooms)

        }
      } catch (error) {
        console.error('Error from get room by id', error);
      }

    }


    // get api for fetching curret login user details like fname, lname, phone, email etc
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

    // calling myProfile function on useEffect hooks
    myProfile();

    // calling getRoomById function in useEffect hook
    getRoomById();


  }, [])



  // get room original price 
  const getOrigionalPrice = async () => {
    try {
      const res = await fetch(`http://localhost:3000/client/origional-room-price/${roomNum ? roomNum : ''}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`
        }
      })

      if (res.status === 200) {
        const finalPrice = await res.json();
        setOrigionalPrice(finalPrice.price)
      }

    } catch (error) {
      console.error('error from get origional price of the room', error)
    }
  }

  // this function fetch the price of the room number for decreasing and increasing the room price and quantity 
  getOrigionalPrice();


  // increase the room quantity

  const increaseQuantity = () => {
    if (quantity > 4) {
      toast.info('Only 5 room can add once, for more contact/visit to hotel')
    } else {
      setQuantity(quantity + 1);
    }

  };

  // decrease the room quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      toast.info('Minimum one room required')
    }
  };


  // for set price of the room
  const price = (originalPrice && originalPrice) * quantity;

  // console.log()

  // for booking room

  const updateNow = async (e) => {
    // console.log(Profile || 'vansh')
    e.preventDefault();
    try {

      if (room.booking_status === 'Canceled') {
        toast.error("You have Canceled the room")
      } else {
        if (localStorage.getItem('usertoken')) {
          const book = {
            room_number: room.room_number,
            room_category: room.room_category,
            room_image: room.room_image,
            room_description: room.room_description,
            room_price: price,
            booking_status: room.booking_status,

            booking_date: room.
              booking_date,
            total_beds: room.total_beds,
            capacity: room.capacity,
            fname: Profile.fname,
            lname: Profile.lname,
            email: Profile.email,
            phone: Profile.phone,
            aadhar_number: Profile.aadhar_number,
            number_of_rooms: quantity,

            check_in_date: room.
              check_in_date,

            check_out_date: room.
              check_out_date

          }

          const res = await fetch(`http://localhost:3000/client/update-view-room/${id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('usertoken')}`
            },
            body: JSON.stringify(book)
          })

          if (res.status == 200) {
            toast.success("Room Booked Successfully");

            navigate('/booking')
          } else {
            toast.error('Somethings Went Wrong, try again later');
            // navigate('/');
          }


        } else {
          navigate("/login");
        }

      }

    } catch (error) {
      console.error('error from update room', error);
    }
  }

  return (
    <>
      <Header />
      <div className="room-details">
        <div className="image-container">
          <img src={`http://localhost:3000/${room.room_image}`} className="room-image" alt={'room Image'} title={`Room number ${room.room_number}`} />
        </div>

        <div className="details-container">
          <h2 className="room-title">Room Number: {room.room_number}</h2>  <span className='room-status'>({room.booking_status})</span>
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

          <button className="book-now-button" onClick={updateNow}>Update</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewBookingRoom;
