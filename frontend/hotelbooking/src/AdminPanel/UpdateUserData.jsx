import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';



const UpdateUserData = () => {

    const {id} = useParams();
    const inputRef = useRef();
    const navigate = useNavigate()

    const [fname, setfName] = useState('');
    const [lname, setlName] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');
    const [aadhar_number, setAadharNumber] = useState('');
    const [role, setRole] = useState('');
    const [profile, setProfile] = useState('');

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('fname', fname);
            formData.append('lname', lname);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('aadhar_number', aadhar_number);   
            formData.append('role', role);                 
            formData.append('profile', profile);

            const UpdateUser = await axios.put(`http://localhost:3000/admin/api/update-user/${id}`, formData, {headers:{Authorization:`Bearer ${localStorage.getItem('admintoken')}`}});

            if(UpdateUser.status === 200){
                toast.success('Updated Successfully');
               navigate('/admin/dashboard')
            }else{
                toast.error('Somethings went wrong');
                navigate('/admin/dashboard')
            }
        } catch (error) {
           
        
            if(error.response.status === 400){
              toast.error('Somethings went wrong')
             navigate('/admin/dashboard')
            }else{
              toast.error('Internal Server Error')
             navigate('/admin/dashboard')
            }
          
        }
    }


    // show user data on when page is load
    useEffect(() => {
        const showUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/admin/api/get-user-details/${id}`, {
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('admintoken')}`
                    }
                })

                if(res.status == 200){
                    const userData = await res.json();
                    setfName(userData.Profile.fname);
                    setlName(userData.Profile.lname);
                    setphone(userData.Profile.phone);
                    setemail(userData.Profile.email);
                    setAadharNumber(userData.Profile.aadhar_number);
                    setRole(userData.Profile.role)
                    setProfile(userData.Profile.profile);                 
                }
            } catch (error) {
                console.error('error from show user data', error);
            }
        }

        showUser();
    },[])

  return (
    <div className="main-container">
    <form onSubmit={handleSubmit}>
      <h2 className="reg-heading">UPDATE USER</h2>

      <div className="input-row">
        <div className="input-box">
          <label htmlFor="firstName" className="reg-label">First Name:</label>
          <input type="text" name="fname" onChange={(e) => setfName(e.target.value)} value={fname} className="reg-input"  />
        </div>
        <div className="input-box">
          <label htmlFor="lastName" className="reg-label">Last Name:</label>
          <input type="text" name="lname" onChange={(e) => setlName(e.target.value)} value={lname} className="reg-input"  />
        </div>
      </div>

      <div className="input-row">
        <div className="input-box">
          <label htmlFor="phone" className="reg-label">Phone:</label>
          <input type="number" name="phone" onChange={(e) => setphone(e.target.value)} value={phone} className="reg-input"  />
        </div>
        <div className="input-box">
          <label htmlFor="email" className="reg-label">Email:</label>
          <input type="email" name="email" onChange={(e) => setemail(e.target.value)} value={email} className="reg-input"  readOnly/>
        </div>
      </div>

      <div className="input-row">
        <div className="input-box">
          <label htmlFor="adhaar" className="reg-label">Adhaar:</label>
          <input type="number" name="aadhar_number" onChange={(e) => setAadharNumber(e.target.value)} value={aadhar_number} className="reg-input" readOnly/>
        </div>
        <div className="input-box">
          <label htmlFor="profile" className="reg-label">Upload Profile:</label>
          <input type="file" ref={inputRef} name="profile" onChange={(e) => setProfile(e.target.files[0])} className="reg-input"  />
        </div>
        <div className="input-box">
          <label htmlFor="profile" className="reg-label">Select Role:</label>
          <select name="role" id="role" onChange={(e) => setRole(e.target.value)} value={role} style={{height:"30px", width:"70%", marginLeft:"22px"}}>
            <option value="1">1</option>
            <option value="0">0</option>
          </select>
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

export default UpdateUserData