import React, { useEffect, useState } from 'react';
import '../Style/UpdateBooking.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateBooking = () => {

    // for navigating user
    const navigate = useNavigate();

    const [updateBooking, setUpdateBooking] = useState({
        room_number:"",
        room_category:"",
        room_description:"",
        room_price:"",
        fname:"",
        lname:"",
        phone:"",
        email:"",
        aadhar_number:"",
        check_in_date:"",
        check_out_date:"",
        booking_check_in_date:"",
        booking_check_out_date:"",
        booking_status:""
    })
    const {id} = useParams();

    // fetch booking data by id;
    const fetchBooking =async () => {
        try {
            const res = await fetch(`https://hotelbooking-zs0a.onrender.com/admin/api/get-booking/${id}`, {
                method:"GET",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('admintoken')}`
                }
            })

            if(res.status === 200){
                const finalRes = await res.json();
                setUpdateBooking({
                    room_number:finalRes.room.room_number,
                    room_category:finalRes.room.room_category,
                    room_description:finalRes.room.room_description,
                    room_price:finalRes.room.room_price,
                    fname:finalRes.room.fname,
                    lname:finalRes.room.lname,
                    phone:finalRes.room.phone,
                    email:finalRes.room.email,
                    aadhar_number:finalRes.room.aadhar_number,
                    check_in_date:finalRes.room.check_in_date,
                    check_out_date:finalRes.room.check_out_date,
                    booking_check_in_date:finalRes.room.booking_check_in_date,
                    booking_check_out_date:finalRes.room.booking_check_out_date,
                    booking_status:finalRes.room.booking_status
                })
            }
        } catch (error) {
            error('error from fetch booking', error);
        }
    }

    useEffect(() => {
        fetchBooking();
    }, [])


    // handle changing
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setUpdateBooking({
            ...updateBooking,
            [name]:value
        })
    }

    // update room by id
    const handleUpdateRoom = async (e) => {
        e.preventDefault();
        
        try {
            const res = await fetch(`https://hotelbooking-zs0a.onrender.com/admin/api/update-booking/${id}`, {
                method:"PUT",
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${localStorage.getItem('admintoken')}`
                },
                body:JSON.stringify(updateBooking)
            })

            if(res.status === 200){
                toast.success("Updated Successfully");
                navigate('/admin/booking-table')

            }else{
                toast.error('Somethings went wrong');
                navigate('/admin/booking-table')
            }
        } catch (error) {
            error('error from handle update room', error);
        }
    }

  return (
    <div className="form-container">
      <h2 className="form-title">Update Booking</h2>
      <form className="update-booking-form" onSubmit={handleUpdateRoom}>
        {/* Room Details Section */}
        <div className="form-group">
          <label className="form-label">Room Number</label>
          <input className="form-input" type="text" name="room_number" value={updateBooking.room_number} readOnly  onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label className="form-label">Room Category</label>
          <input className="form-input" type="text" name="room_category"  readOnly value={updateBooking.room_category} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Room Description</label>
          <input className="form-input" type="text" name="room_description" value={updateBooking.room_description} readOnly onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label className="form-label">Room Price</label>
          <input className="form-input" type="text" name="room_price" value={updateBooking.room_price} readOnly onChange={handleChange}/>
        </div>

        {/* Customer Details Section */}
        <div className="form-group">
          <label className="form-label">First Name</label>
          <input className="form-input" type="text" name="fname" value={updateBooking.fname} readOnly onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label className="form-label">Last Name</label>
          <input className="form-input" type="text" name="lname" value={updateBooking.lname} readOnly onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label className="form-label">Phone</label>
          <input className="form-input" type="text" name="phone" value={updateBooking.phone} readOnly onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" name="email"value={updateBooking.email} readOnly onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label className="form-label">Aadhar Number</label>
          <input className="form-input" type="text" name="aadhar_number" value={updateBooking.aadhar_number} readOnly onChange={handleChange}/>
        </div>

        {/* First Check-In and Check-Out Date */}
        <div className="form-group">
          <label className="form-label">Room Check-In Date</label>
          <input className="form-input" type="datetime-local" name="check_in_date" value={updateBooking.check_in_date} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label className="form-label">Room Check-Out Date</label>
          <input className="form-input" type="datetime-local" name="check_out_date" value={updateBooking.check_out_date} onChange={handleChange}/>
        </div>

        {/* Second Check-In and Check-Out Date */}
        <div className="form-group">
          <label className="form-label">User Check-In Date</label>
          <input className="form-input" type="date" name="booking_check_in_date" value={updateBooking.booking_check_in_date} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label className="form-label">User Check-Out Date</label>
          <input className="form-input" type="date" name="booking_check_out_date" value={updateBooking.booking_check_out_date} onChange={handleChange}/>
        </div>

        {/* Booking Status */}
        <div className="form-group">
          <label className="form-label">Booking Status</label>
          <select className="form-input" name="booking_status" onChange={handleChange} value={updateBooking.booking_status}>
            <option value="Pending" selected>Pending</option>
            <option value="Approved">Approved</option>
          </select>
        </div>

        <button className="form-button" type="submit">Update Booking</button>
      </form>
    </div>
  );
};

export default UpdateBooking;
