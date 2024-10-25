import React, { useEffect, useState } from 'react';
import '../Style/Booking.css'
import Header from './Header';
import Footer from './Footer';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MyBooking = () => {
    const [MyBooking, setMyBooking] = useState([])


    const getAllBooking =async () => {
        try {
            const getRoom = await fetch(`http://localhost:3000/client/get-my-booking`, {
                method:"GET",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('usertoken')}`
                }
            })

            if(getRoom.status === 200){
                const finalBooking = await getRoom.json();
                setMyBooking(finalBooking.booking)
            }
        } catch (error) {
            console.error('error from get my responsive', error);
        }
    }


    // cancel booking
  const cancelBooking = async (item) => {
    try {

      if(item.booking_status === 'Canceled'){
        toast.info("Room allready Canceled")
      }else{
        const res = await fetch(`http://localhost:3000/client/cancel-booking/${item._id}`, {
          method:"PUT",
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${localStorage.getItem('usertoken')}`
          }
          
        })
  
        if(res.status === 200){
          toast.success("Cancel Successfully")
          getAllBooking();
        }else{
          toast.error("Somethings Went wrong")
        }
      }
    } catch (error) {
      console.error('error from cancel booking', error);
    }
  }

    useEffect(() => {
        if(localStorage.getItem('usertoken')){
            getAllBooking();
        }
    
    }, [])



  return (
    <>
    <Header />
   {
    MyBooking.length > 0 ? 
    <div className="table-container">
    <table className="booking-table">
      <thead>
        <tr>
          <th>S.r. No</th>
          <th>Image</th>
          <th>Room Number</th>
          <th>Category</th>
          <th>Description</th>
          <th>Price</th>
          <th>Beds</th>
          <th>Capacity</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>Aadhar Number</th>
          <th>Check-in Date</th>
          <th>Check-out Date</th>
          <th>Number of Rooms</th>
          <th>Booking Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {MyBooking.map((item, index) => (
          <tr key={item._id}>
            <td>{index+1}</td>
            <td><img src={`http://localhost:3000/${item.room_image}`} alt="Room" className="myroom-image" /></td>
            <td>{item.room_number}</td>
            <td>{item.room_category}</td>
            <td>{item.room_description}</td>
            <td>{item.room_price}</td>
            <td>{item.total_beds}</td>
            <td>{item.capacity}</td>
            <td>{item.fname}</td>
            <td>{item.lname}</td>
            <td>{item.phone}</td>
            <td>{item.aadhar_number}</td>
            <td>{item.check_in_date}</td>
            <td>{item.check_out_date}</td>
            <td>{item.number_of_rooms}</td>
            <td>{item.booking_date}</td>
            <td>{item.booking_status}</td>
            <td>
              <Link to={`/view_booking_room/${item._id}`}>View</Link>  
              <button onClick={() => cancelBooking(item)}>Cancel</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  :
  <h3>NOT ROOM BOOK YET</h3>
   }

    <Footer />
    </>
  );
};

export default MyBooking;
