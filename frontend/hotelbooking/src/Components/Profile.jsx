import React, { useState, useEffect } from 'react'
import '../Style/Profile.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BallTriangle } from 'react-loader-spinner'


const Profile = () => {

    const navigate = useNavigate();


    const [MYprofile, setProfile] = useState({
        _id: "",
        fname: "",
        lname: "",
        phone: "",
        email: "",
        aadhar_number: "",
        profile: ""
    })


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
                setProfile({
                    id: final_res.profile._id,
                    fname: final_res.profile.fname,
                    lname: final_res.profile.lname,
                    phone: final_res.profile.phone,
                    email: final_res.profile.email,
                    aadhar_number: final_res.profile.aadhar_number,
                    profile: final_res.profile.profile
                })
            }
        } catch (error) {
            console.error('error from show profile data', error);
        }
    }


    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setProfile({
            ...MYprofile,
            [name]: value
        })
    }


    const hanldeSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!MYprofile.fname || !MYprofile.phone || !MYprofile.email || !MYprofile.aadhar_number) {
                toast.error('All field is required')
            } else {
                const res = await fetch(`http://localhost:3000/client/update-user-account/${MYprofile.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(MYprofile)
                })

                if (res.status === 200) {
                    toast.success('Profile Updated Successfully')
                    myProfile();
                } else {
                    toast.error('Somethings went wrong')
                }
            }
        } catch (error) {
            console.error('error from update profile', error);
        }
    }
    useEffect(() => {
        if (localStorage.getItem('usertoken')) {
            myProfile();
        } else {
            navigate('/login')
        }

    }, [])

    return (
        <>
            <div className="loader-spinner">
                {
                    MYprofile ?
                        <section className="sec3">
                            <div className="profileData">
                                <div className="profileForm">
                                    <div className="proform11">
                                        <img src={`http://localhost:3000/${MYprofile.profile}`} alt="" style={{ height: "70px", width: "70px", borderRadius: "50%", display: "block", margin: "0px auto" }} />
                                        {/* <h6>My Profile</h6> */}
                                        <form onSubmit={hanldeSubmit}>
                                            <label htmlFor="fname">First Name </label>
                                            <input type="text" name="fname" id="fname" value={MYprofile.fname} onChange={handleChange} />
                                            <label htmlFor="lname">Last Name </label>
                                            <input type="text" name="lname" id="lname" value={MYprofile.lname} onChange={handleChange} />
                                            <label htmlFor="mobile">Mobile Number</label>
                                            <input type="mobile" name="phone" id="mobile" value={MYprofile.phone} onChange={handleChange} />
                                            <label htmlFor="email"> Email</label>
                                            <input type="email" name="email" id="email" value={MYprofile.email} onChange={handleChange} readOnly title='Email can not Change' />
                                            <label htmlFor="email"> Aadhar</label>
                                            <input type="text" name="aadhar_number" id="aadhar_number" value={MYprofile.aadhar_number} onChange={handleChange} readOnly title='Aadhar number can not Change' />
                                            <input type="submit" value="Save" name="submit" id="save" style={{ cursor: "pointer" }} />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                        :
                        // this is a loader
                        <BallTriangle />
                }
            </div>


        </>

    )
}

export default Profile