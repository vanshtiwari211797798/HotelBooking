import React, { useState } from 'react';
import '../Style/AddCategory.css'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const navigate = useNavigate();
    const [room_category_name, setRoomCategoryName] = useState('');
    const [room_category_price, setRoomCategoryPrice] = useState('');
    const [room_category_image, setRoomCategoryImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('room_category_name', room_category_name);
            formData.append('room_category_price', room_category_price);
            formData.append('room_category_image', room_category_image);

            const res = await axios.post(`https://hotelbooking-zs0a.onrender.com/admin/api/add-room-category`, formData);
            if(res.status === 201){
                setRoomCategoryName("");
                setRoomCategoryImage("");
                setRoomCategoryPrice("");
                toast.success("Category Added successfully");
            }else{
                setRoomCategoryName("");
                setRoomCategoryImage("");
                setRoomCategoryPrice("");
                navigate('/admin/dashboard');
                toast.error("Somethings went wrong, try again later");
            }
        } catch (error) {
            console.error('Error from add category frontend', error);
        }
    };

    return (
        <div className="add-category-container">
            <form onSubmit={handleSubmit}>
                <h2 className="form-heading">Add Room Category</h2>

                <div className="form-rows">
                    <div className="input-group">
                        <label htmlFor="room_category_name" className="input-label">
                            Select Category:
                        </label>
                        <select
                            name="room_category_name"
                            className="input-field"
                            value={room_category_name}
                            onChange={(e) => setRoomCategoryName(e.target.value)}
                            required
                        >
                            <option value="">Select a Category</option>
                            <option value="dilux">Dilux</option>
                            <option value="superDilux">Super Dilux</option>
                            <option value="Luxery">Luxury</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="room_category_price" className="input-label">
                            Category Price:
                        </label>
                        <input
                            type="text"
                            name="room_category_price"
                            className="input-field"
                            value={room_category_price}
                            onChange={(e) => setRoomCategoryPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="room_category_image" className="input-label">
                            Room Image:
                        </label>
                        <input
                            type="file"
                            name="room_category_image"
                            onChange={(e) => setRoomCategoryImage(e.target.files[0])}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <button type="submit" className="submit-button">
                        Add Room
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCategory;
