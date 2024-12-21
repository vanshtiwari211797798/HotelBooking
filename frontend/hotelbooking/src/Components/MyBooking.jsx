import React, { useEffect, useState } from 'react';
import '../Style/Booking.css'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const MyBooking = () => {

  const navigate = useNavigate();

    const [MyBooking, setMyBooking] = useState([])
    


    const getAllBooking =async () => {
        try {
            const getRoom = await fetch(`https://hotelbooking-zs0a.onrender.com/client/get-my-booking`, {
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
        const res = await fetch(`https://hotelbooking-zs0a.onrender.com/client/cancel-booking/${item._id}`, {
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
        }else{
          navigate('/login')
        }
    
    }, [])



  return (
    <>

   
   
    <div className="table-container">
      {
        MyBooking.length > 0 ? 
      
    <table className="booking-table">
      <thead>
        <tr>
          <th>S.r. No</th>
          <th>Image</th>
          <th>Room Number</th>
          <th>Category</th>
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
            <td><img src={`https://hotelbooking-zs0a.onrender.com/${item.room_image}`} alt="Room" className="myroom-image" /></td>
            <td>{item.room_number}</td>
            <td>{item.room_category}</td>
            <td>{item.room_price}</td>
            <td>{item.total_beds}</td>
            <td>{item.capacity}</td>
            <td>{item.fname}</td>
            <td>{item.lname}</td>
            <td>{item.phone}</td>
            <td>{item.aadhar_number}</td>
            <td>{new Date(item.booking_check_in_date).toLocaleDateString()}</td>
            <td>{new Date(item.booking_check_out_date).toLocaleDateString()}</td>
            <td>{item.number_of_rooms}</td>
            <td>{item.booking_date}</td>
            <td>{item.booking_status}</td>
            <td>
              <Link  to={`/view_booking_room/${ item.booking_status === 'Pending' ? item._id : ''}`}>View</Link>  
              <button onClick={() => cancelBooking(item)}>Cancel</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    :
    <h3 style={{textAlign:"center"}}>No Booking Record Found</h3>
}
  </div>



    </>
  );
};

export default MyBooking;
