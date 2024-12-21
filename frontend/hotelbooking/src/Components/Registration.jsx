import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Style/Registration.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Registration = () => {
  const navigate = useNavigate();
  const inputRef = useRef();

  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [aadhar_number, setAadharNumber] = useState('');
  const [profile, setProfile] = useState('');
  const [password, setPassword] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [aadharTouched, setAadharTouched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (aadhar_number.length === 12 && phone.length === 10) {
        const formData = new FormData();
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('aadhar_number', aadhar_number);
        formData.append('profile', profile);
        formData.append('password', password);

        const res = await axios.post(`https://hotelbooking-zs0a.onrender.com/client/register`, formData);

        if (res.status === 201) {
          toast.success('User Register Successfully');
          navigate("/login");
          setfName('');
          setlName('');
          setphone('');
          setemail('');
          setAadharNumber('');
          setPassword('');
          if (inputRef.current) {
            inputRef.current.value = '';
          }
        }
      } else {
        toast.error('Enter correct Aadhar or Phone digits');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('All fields are required');
        } else if (error.response.status === 409) {
          toast.error("User Already Registered, please Login");
        } else {
          toast.error('Server Error');
        }
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('usertoken')) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="main-containers">
        <form onSubmit={handleSubmit} className='register_form'>
          <h2 className="reg-heading">REGISTRATION</h2>

          <div className="input-row">
            <div className="input-box">
              <label htmlFor="firstName" className="reg-label">First Name</label>
              <input 
                type="text" 
                name="fname" 
                onChange={(e) => {
                  if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                    setfName(e.target.value);
                  }
                }} 
                value={fname} 
                className="reg-input" 
                required 
              />
            </div>
            <div className="input-box">
              <label htmlFor="lastName" className="reg-label">Last Name</label>
              <input 
                type="text" 
                name="lname" 
                onChange={(e) => setlName(e.target.value)} 
                value={lname} 
                className="reg-input" 
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-box">
              <label htmlFor="phone" className="reg-label">Phone</label>
              <input 
                type="number" 
                name="phone" 
                onChange={(e) => setphone(e.target.value)} 
                onBlur={() => setPhoneTouched(true)} 
                value={phone} 
                className="reg-input" 
                required 
              />
              {phoneTouched && (
                phone.length === 10 
                ? <small style={{ paddingLeft: "21px", color: "green", fontWeight: "bolder" }}>Valid Phone</small> 
                : <small style={{ paddingLeft: "21px", color: "red", fontWeight: "bolder" }}>Invalid Phone</small>
              )}
            </div>
            <div className="input-box">
              <label htmlFor="email" className="reg-label">Email</label>
              <input 
                type="email" 
                name="email" 
                onChange={(e) => setemail(e.target.value)} 
                value={email} 
                className="reg-input" 
                required 
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-box">
              <label htmlFor="adhaar" className="reg-label">Adhaar</label>
              <input 
                type="number" 
                name="aadhar_number" 
                onChange={(e) => setAadharNumber(e.target.value)} 
                onBlur={() => setAadharTouched(true)} 
                value={aadhar_number} 
                className="reg-input" 
              />
              {aadharTouched && (
                aadhar_number.length === 12 
                ? <small style={{ paddingLeft: "21px", color: "green", fontWeight: "bolder" }}>Valid Aadhar</small> 
                : <small style={{ paddingLeft: "21px", color: "red", fontWeight: "bolder" }}>Invalid Aadhar</small>
              )}
            </div>
            <div className="input-box">
              <label htmlFor="profile" className="reg-label">Upload Profile</label>
              <i class="fa fa-upload" title='upload profile' onClick={() => inputRef.current.click()}></i>
              <input 
                type="file" 
                ref={inputRef} 
                name="profile" 
                onChange={(e) => setProfile(e.target.files[0])} 
                className="reg-input" 
                required 
                style={{display:'none'}}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-box">
              <label htmlFor="password" className="reg-label">Password</label>
              <input 
                type="password" 
                name="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                className="reg-input" 
                required 
              />
            </div>
          </div>

          <div className="button">
            <button type="submit" className="reg-button">Submit</button>
          </div>
          <div className="reg-link">
            <h5 className="reg-h5">Already Have an Account? <Link to="/login" className='a'>Login</Link></h5>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
