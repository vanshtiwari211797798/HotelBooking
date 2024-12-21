import React, { useState, useEffect } from 'react';
import '../Style/Profile.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';

const Profile = () => {
    const navigate = useNavigate();

    const [MYprofile, setProfile] = useState({
        _id: '',
        fname: '',
        lname: '',
        phone: '',
        email: '',
        aadhar_number: '',
        profile: '',
    });
    const [loading, setLoading] = useState(true); // Loader state to manage spinner visibility

    // Fetch user profile data
    const myProfile = async () => {
        try {
            const res = await fetch(`https://hotelbooking-zs0a.onrender.com/client/user-profile`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('usertoken')}`,
                },
            });

            if (res.status === 200) {
                const final_res = await res.json();
                setProfile({
                    id: final_res.profile._id,
                    fname: final_res.profile.fname,
                    lname: final_res.profile.lname,
                    phone: final_res.profile.phone,
                    email: final_res.profile.email,
                    aadhar_number: final_res.profile.aadhar_number,
                    profile: final_res.profile.profile,
                });
                setLoading(false); // Stop loading spinner
            } else {
                toast.error('Failed to fetch profile data.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            toast.error('An error occurred while fetching profile data.');
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit updated profile data
    const hanldeSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!MYprofile.fname || !MYprofile.phone || !MYprofile.email || !MYprofile.aadhar_number) {
                toast.error('All fields are required.');
                return;
            }

            const res = await fetch(
                `https://hotelbooking-zs0a.onrender.com/client/update-user-account/${MYprofile.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(MYprofile),
                }
            );

            if (res.status === 200) {
                toast.success('Profile Updated Successfully');
                myProfile(); // Refresh profile data
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('An error occurred while updating your profile.');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('usertoken')) {
            myProfile(); // Fetch profile data on component mount
        } else {
            navigate('/login'); // Redirect to login if no token
        }
    }, [navigate]);

    if (loading) {
        return (
            <div className="loader-spinner">
                <BallTriangle />
            </div>
        );
    }

    return (
        <section className="sec3">
            <div className="profileData">
                <div className="profileForm">
                    <div className="proform11">
                        <img
                            src={`https://hotelbooking-zs0a.onrender.com/${MYprofile.profile}`}
                            alt="Profile"
                            style={{
                                height: '70px',
                                width: '70px',
                                borderRadius: '50%',
                                display: 'block',
                                margin: '0px auto',
                            }}
                        />
                        <form onSubmit={hanldeSubmit}>
                            <label htmlFor="fname">First Name </label>
                            <input
                                type="text"
                                name="fname"
                                id="fname"
                                value={MYprofile.fname}
                                onChange={handleChange}
                            />
                            <label htmlFor="lname">Last Name </label>
                            <input
                                type="text"
                                name="lname"
                                id="lname"
                                value={MYprofile.lname}
                                onChange={handleChange}
                            />
                            <label htmlFor="mobile">Mobile Number</label>
                            <input
                                type="text"
                                name="phone"
                                id="mobile"
                                value={MYprofile.phone}
                                onChange={handleChange}
                            />
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={MYprofile.email}
                                readOnly
                                title="Email cannot be changed"
                            />
                            <label htmlFor="aadhar_number">Aadhar Number</label>
                            <input
                                type="text"
                                name="aadhar_number"
                                id="aadhar_number"
                                value={MYprofile.aadhar_number}
                                readOnly
                                title="Aadhar number cannot be changed"
                            />
                            <input
                                type="submit"
                                value="Save"
                                name="submit"
                                id="save"
                                style={{ cursor: 'pointer' }}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
