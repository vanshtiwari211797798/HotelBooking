import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'


const BookingTable = () => {

    const navigate = useNavigate();
    const [booking, setBooking] = useState([])
    const [admins, setAdmin] = useState('')



    // for showing all booking details
    const showAllbooking = async () => {
        try {
            const res = await fetch(`https://hotelbooking-zs0a.onrender.com/admin/api/get-bookings`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('admintoken')}`
                }
            })

            if (res.status === 200) {
                const bookings = await res.json();
                setBooking(bookings.bookings)
            }
        } catch (error) {
            console.error('error from showing all rooms', error);
        }
    }


    // Show the name of current login admin or subAdmin
    const currentLogin = async () => {
        try {
            const res = await fetch(`https://hotelbooking-zs0a.onrender.com/admin/api/user-profile`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('admintoken')}`
                }
            })

            if (res.status === 200) {
                const admin = await res.json();
                setAdmin(admin.profile)
            }
        } catch (error) {
            console.error('error from current login admin or subadmin', error);
        }
    }

    // logout user
    const Logout = () => {
        localStorage.removeItem('admintoken');
        navigate('/')
        toast.success('Logout Successfully')
    }

    function showSection(sectionId) {

        // Show the selected section
        document.getElementById(sectionId).style.display = 'block';
    }

    // Show the dashboard by default when the page loads
    useEffect(() => {
        showSection('booking');
    }, [])


    useEffect(() => {


        if (localStorage.getItem('admintoken')) {
            currentLogin();
            showAllbooking();
        } else {
            navigate('/')
        }
    }, [])


    // Delete Room Booking
    const DeleteBooking = async (Id) => {
        try {
            const res = await fetch(`https://hotelbooking-zs0a.onrender.com/admin/api/delete-booking/${Id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('admintoken')}`
                }
            })

            if (res.status == 200) {
                toast.success('Deleted Successfully')
            } else {
                toast.error('Somethings went wrong')
            }
        } catch (error) {
            console.error('error from deleted user', error);
        }
    }


    // Approved Booking
    const ApprovedBooking = async (id, item) => {
        try {
            if (item.booking_status === 'Pending') {
                const res = await fetch(`https://hotelbooking-zs0a.onrender.com/admin/api/approved-booking/${id}`, {
                    method: "PUT"
                })

                if (res.status === 200) {
                    toast.success('Booking Approved Successfully')
                }
            } else {
                toast.error("Booking is allready Approved")
            }
        } catch (error) {
            console.error('error from approved booking', error);
        }
    }

    return (
        <>
            <div className="Admin-body">
                <div className="admin_container">
                    {/* Sidebar */}
                    <nav className="sidebar">

                        <ul>
                            <li>
                                <Link to={`/admin/dashboard`}>Dashboard</Link>
                            </li>

                            <li>
                                <Link onClick={() => showSection('booking')}>Booking</Link>
                            </li>
                            <input className="i-but" type="button" defaultValue="Logout" onClick={Logout} />
                        </ul>
                    </nav>
                    {/* Main Content Sections */}
                    <div id="dashboard" className="main-content">
                        <header className="admin_header">
                            <h2> Admin Dashboard</h2>
                        </header>

                    </div>
                    {/* Booking Section */}
                    <div id="booking" className="main-content">
                        {
                            admins.role === 1 ?
                                booking.length < 1 ? "NO BOOKING FOUND" :
                                    <div className="table-admin_container">
                                        <h2 className="table-content">Booking</h2>
                                        <table className="table">
                                            <thead>
                                                <tr className="tr">
                                                    <th className="th">Sr. No.</th>
                                                    <th className="th">Room. No.</th>
                                                    <th className="th">Category</th>
                                                    <th className="th">Description</th>
                                                    <th className="th">Price</th>
                                                    <th className="th">Total Beds</th>
                                                    <th className="th">Capacity</th>
                                                    <th className="th">First Name</th>
                                                    <th className="th">Last Name</th>
                                                    <th className="th">Phone No.</th>
                                                    <th className="th">Email ID</th>
                                                    <th className="th">Aadhaar No.</th>
                                                    <th className="th">Room Image</th>
                                                    <th className="th">Room CheckIn Date</th>
                                                    <th className="th">Room CheckOut Date</th>
                                                    <th className="th">User CheckIn Date</th>
                                                    <th className="th">User CheckOut Date</th>
                                                    <th className="th">Room Bookig Status</th>
                                                    <th className="th">Update</th>
                                                    <th className="th">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    booking.map((item, index) => {
                                                        return (
                                                            <tr className="tr" key={index}>
                                                                <td className="td">{index + 1}</td>
                                                                <td className="td">{item.room_number}</td>
                                                                <td className="td">{item.room_category}</td>
                                                                <td className="td">{item.room_description}</td>
                                                                <td className="td">{item.room_price}</td>
                                                                <td className="td">{item.total_beds}</td>
                                                                <td className="td">{item.capacity}</td>
                                                                <td className="td">{item.fname}</td>
                                                                <td className="td">{item.lname}</td>
                                                                <td className="td">{item.phone}</td>
                                                                <td className="td">{item.email}</td>
                                                                <td className="td">{item.aadhar_number}</td>
                                                                <td className="td"><img src={`https://hotelbooking-zs0a.onrender.com/${item.room_image}`} alt="room" style={{ height: "60px", width: "60px" }} /></td>
                                                                <td className="td">{item.check_in_date === 'NA' ? item.check_in_date : new Date(item.check_in_date).toLocaleString()}</td>
                                                                <td className="td">{item.check_out_date === 'NA' ? item.check_out_date : new Date(item.check_out_date).toLocaleString()}</td>
                                                                <td className="td">{new Date(item.booking_check_in_date).toLocaleDateString()}</td>
                                                                <td className="td">{new Date(item.booking_check_out_date).toLocaleDateString()}</td>
                                                                <td className="td">{item.booking_status}</td>
                                                                <td className="td"><Link to={`/admin/update-booking/${item._id}`} className='Link'>Update</Link></td>
                                                                <td className="td"><button style={{ height: "40px", width: "80px", fontSize: "16px", background: "#002233", color: "#fff", cursor: "pointer", borderRadius: "5px" }} onClick={() => DeleteBooking(item._id)}>Delete</button></td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                                {/* Add more rows as needed */}
                                            </tbody>
                                        </table>
                                    </div>
                                :
                                ""
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingTable