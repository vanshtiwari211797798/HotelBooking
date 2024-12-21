import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';


const UpdateRoomData = () => {

    const [room_number, setroom_number] = useState('');
    const [room_category, setroom_category] = useState('');
    const [room_image, setroom_image] = useState('');
    const [room_description, setroom_description] = useState('');
    const [room_price, setroom_price] = useState('');
    const [total_beds, settotal_beds] = useState('');
    const [capacity, setcapacity] = useState('');
    const [room_booking_status, setroom_booking_status] = useState('');


    const { id } = useParams();
    const navigate = useNavigate();


    // updating the room
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('room_number', room_number);
            formData.append('room_category', room_category);
            formData.append('room_image', room_image);
            formData.append('room_description', room_description);
            formData.append('room_price', room_price);
            formData.append('total_beds', total_beds);
            formData.append('capacity', capacity);
            formData.append('room_booking_status', room_booking_status);


            const res = await axios.put(`https://hotelbooking-zs0a.onrender.com/admin/api/update-room/${id}`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('admintoken')}` } })

            if (res.status === 200) {
                toast.success('Updated Successfully')
                navigate('/admin/dashboard')
            } else {
                toast.error('Somethings Went wrong')
                navigate('/admin/dashboard')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error('Unauthorized Access')
                    navigate('/admin/dashboard')
                } else {
                    toast.error('Somethings went WRONG')
                    navigate('/admin/dashboard')
                }
            } else {
                toast.error('Internal Server Error')
                navigate('/admin/dashboard')
            }
        }
    }


    useEffect(() => {

        const fetchRoom = async () => {
            try {
                const res = await fetch(`https://hotelbooking-zs0a.onrender.com/admin/api/get-room/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('admintoken')}`
                    }
                })

                if (res.status === 200) {
                    const rooms = await res.json();
                    setroom_number(rooms.Room.room_number)
                    setroom_category(rooms.Room.room_category)
                    setroom_image(rooms.Room.room_image)
                    setroom_description(rooms.Room.room_description)
                    setroom_price(rooms.Room.room_price)
                    settotal_beds(rooms.Room.total_beds)
                    setcapacity(rooms.Room.capacity)
                    setroom_booking_status(rooms.Room.room_booking_status)
                }

            } catch (error) {
                console.error('error from fetch room details', error);
            }
        }


        fetchRoom();

    }, [])

    return (
        <div className="main-containers">
            <form onSubmit={handleUpdate}>
                <h2 className="reg-heading">UPDATE ROOM</h2>

                <div className="input-row">
                    <div className="input-box">
                        <label htmlFor="room number" className="reg-label">Room No:</label>
                        <input type="text" name="room_number" className="reg-input" onChange={(e) => setroom_number(e.target.value)} value={room_number} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="category" className="reg-label">Category:</label>
                        <input type="text" name="room_category" className="reg-input" onChange={(e) => setroom_category(e.target.value)} value={room_category} />
                    </div>
                </div>

                <div className="input-row">
                    <div className="input-box">
                        <label htmlFor="desc" className="reg-label">Description:</label>
                        <input type="text" name="room_description" className="reg-input" onChange={(e) => setroom_description(e.target.value)} value={room_description} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="price" className="reg-label">Price:</label>
                        <input type="text" name="room_price" className="reg-input" onChange={(e) => setroom_price(e.target.value)} value={room_price} />
                    </div>
                </div>

                <div className="input-row">
                    <div className="input-box">
                        <label htmlFor="beds" className="reg-label">Total Beds:</label>
                        <input type="text" name="total_beds" className="reg-input" onChange={(e) => settotal_beds(e.target.value)} value={total_beds} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="capacity" className="reg-label">Capacity</label>
                        <input type="text" name="capacity" className="reg-input" onChange={(e) => setcapacity(e.target.value)} value={capacity} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="booking status" className="reg-label">Booking Status:</label>
                        <select name="room_booking_status" id="booking status" style={{ height: "30px", width: "70%", marginLeft: "22px" }} onChange={(e) => setroom_booking_status(e.target.value)} value={room_booking_status}>
                            <option value="unavailable">unavailable</option>
                            <option value="available">available</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <label htmlFor="roomImage" className="reg-label">Room Image</label>
                        <input type="file" name='room_image' style={{ marginLeft: "20px" }} onChange={(e) => setroom_image(e.target.files[0])} />
                    </div>
                </div>

                <div className="button">
                    <button type="submit" className="reg-button">Update</button>
                </div>
                <div className="reg-link">
                </div>
            </form>
        </div>
    )
}

export default UpdateRoomData