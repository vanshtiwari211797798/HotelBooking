import React, { useState } from 'react'

const AddCategory = () => {

    const [room_category_name, setroom_category_name] = useState('');
    const [room_category_price, setroom_category_price] = useState('');
    const [room_category_image, setroom_category_image] = useState('');

    const handleSubmit = async () => {
        try {
            
        } catch (error) {
            console.error('error from add category frontend', error);
        }
    }
    

  return (
    <div className="main-container">
    <form onSubmit={handleSubmit}>
        <h2 className="reg-heading">ADD ROOM</h2>



        <div className="input-row">
        <div className="input-box">
                <label htmlFor="capacity" className="reg-label">Capacity</label>
                <select name="room_category_name" id="room_category_name">
                    <option value="">Select Category..</option>
                    <option value="dilux">Dilux</option>
                    <option value="superDilux">superDilux</option>
                    <option value="Luxery">Luxery</option>
                </select>
            </div>
            <div className="input-box">
                <label htmlFor="room_category_name" className="reg-label">Category Name:</label>
                <input type="text" name="room_category_name" className="reg-input"  required/>
            </div>
   

            <div className="input-box">
                <label htmlFor="roomImage" className="reg-label">Room Image</label>
                <input type="file" name='room_image' style={{ marginLeft: "20px" }}  required/>
            </div>
        </div>

        <div className="button">
            <button type="submit" className="reg-button">ADD ROOM</button>
        </div>
        <div className="reg-link">
        </div>
    </form>
</div>
  )
}

export default AddCategory