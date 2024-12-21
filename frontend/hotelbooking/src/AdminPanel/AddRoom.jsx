import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';



const AddRoom = () => {

    const navigate = useNavigate();


    const [room_number, setroom_number] = useState('');
    const [room_category, setroom_category] = useState('');
    const [room_image, setroom_image] = useState('');
    const [room_description, setroom_description] = useState('');
    const [room_price, setroom_price] = useState('');
    const [total_beds, settotal_beds] = useState('');
    const [capacity, setcapacity] = useState('');



    const handleSubmit = async (e) => {
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

            const res = await axios.post(`https://hotelbooking-zs0a.onrender.com/admin/api/add-room`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem('admintoken')}` } })

            if(res.status === 201){
                toast.success('Room added successfully')
                navigate('/admin/dashboard')
            }
        } catch (error) {
            if(error.response){
                if(error.response.status === 409){
                    toast.info('Room allready exist')
                }else if(error.response.status === 400){
                    toast.info('All field is required')
                }else{
                    toast.error('Somethings went wrong')
                    navigate('/admin/dashboard')
                }
            }else{
                toast.error('Internal Server Error')
                navigate('/admin/dashboard')
            }
        }
    }

    return (
        <>
            <div className="main-container">
                <form onSubmit={handleSubmit}>
                    <h2 className="reg-heading">ADD ROOM</h2>

                    <div className="input-row">
                        <div className="input-box">
                            <label htmlFor="room number" className="reg-label">Room No:</label>
                            <input type="number" name="room_number" className="reg-input" onChange={(e) => setroom_number(e.target.value)} value={room_number} required/>
                        </div>
                        <div className="input-box">
                            <label htmlFor="category" className="reg-label">Category:</label>
                            <select name="room_category" className="reg-input" id="room_category" onChange={(e) => setroom_category(e.target.value)} value={room_category}>
                                <option value="">Select Category..</option>
                                <option value="dilux">Dilux</option>
                                <option value="superDilux">superDilux</option>
                                <option value="Luxery">Luxery</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-box">
                            <label htmlFor="desc" className="reg-label">Description:</label>
                            <input type="text" name="room_description" className="reg-input" onChange={(e) => setroom_description(e.target.value)} value={room_description} required/>
                        </div>
                        <div className="input-box">
                            <label htmlFor="price" className="reg-label">Price:</label>
                            <input type="number" name="room_price" className="reg-input" onChange={(e) => setroom_price(e.target.value)} value={room_price} required/>
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-box">
                            <label htmlFor="beds" className="reg-label">Total Beds:</label>
                            <input type="number" name="total_beds" className="reg-input" onChange={(e) => settotal_beds(e.target.value)} value={total_beds} required/>
                        </div>
                        <div className="input-box">
                            <label htmlFor="capacity" className="reg-label">Capacity</label>
                            <input type="text" name="capacity" className="reg-input" onChange={(e) => setcapacity(e.target.value)} value={capacity} required/>
                        </div>

                        <div className="input-box">
                            <label htmlFor="roomImage" className="reg-label">Room Image</label>
                            <input type="file" name='room_image' style={{ marginLeft: "20px" }} onChange={(e) => setroom_image(e.target.files[0])} required/>
                        </div>
                    </div>

                    <div className="button">
                        <button type="submit" className="reg-button">ADD ROOM</button>
                    </div>
                    <div className="reg-link">
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddRoom