import React, { useEffect, useState } from 'react'
import '../Style/AdminDashboard.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'



const AdminDashboard = () => {

    document.title = `Techsima || Admin Dashboard`
    const navigate = useNavigate();
    const [Rooms, setRooms] = useState([])

    const [users, setUsers] = useState([])

    const [contacts, setContacts] = useState([])

    const [enq, setEnq] = useState([])

    const [booking, setBooking] = useState([])

    const [admins, setAdmin] = useState('')



    function showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.main-content');
        sections.forEach(section => section.style.display = 'none');

        // Show the selected section
        document.getElementById(sectionId).style.display = 'block';
    }

    // Show the dashboard by default when the page loads
    useEffect(() => {
        showSection('dashboard');
    }, [])


    // Show the name of current login admin or subAdmin
    const currentLogin = async () => {
        try {
            const res = await fetch(`http://localhost:3000/admin/api/user-profile`, {
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

    // logout Admin
    const Logout = () => {
        localStorage.removeItem('admintoken');
        navigate('/')
        toast.success('Logout Successfully')
    }



    // Api for showing all rooms
    const showAllRooms = async () => {
        try {
            const res = await fetch(`http://localhost:3000/admin/api/get-all-room`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('admintoken')}`
                }
            })

            if (res.status === 200) {
                const finalRes = await res.json();
                setRooms(finalRes.rooms)
            }
        } catch (error) {
            console.error('error from showing all rooms', error);
        }
    }


    // show all users
    const showAllUsers = async () => {
        try {
            const res = await fetch(`http://localhost:3000/admin/api/get-all-user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('admintoken')}`
                }
            })

            if (res.status === 200) {
                const User = await res.json();
                setUsers(User.User)
            }
        } catch (error) {
            console.error('error from showing all rooms', error);
        }
    }



    // show all contacts
    const showAllcontacts = async () => {
        try {
            const res = await fetch(`http://localhost:3000/admin/api/get-all-contact`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('admintoken')}`
                }
            })

            if (res.status === 200) {
                const Contacts = await res.json();
                setContacts(Contacts.Contact)
            }
        } catch (error) {
            console.error('error from showing all rooms', error);
        }
    }


    // show all enquires
    const showAllenquires = async () => {
        try {
            const res = await fetch(`http://localhost:3000/admin/api/get-enquiry`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('admintoken')}`
                }
            })

            if (res.status === 200) {
                const Enq = await res.json();
                setEnq(Enq.enquiryData)
            }
        } catch (error) {
            console.error('error from showing all rooms', error);
        }
    }


    // for showing all booking details
    const showAllbooking = async () => {
        try {
            const res = await fetch(`http://localhost:3000/admin/api/get-bookings`, {
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


    // Delete User
    const DeleteUser = async (Id) => {
        try {
            const res = await fetch(`http://localhost:3000/admin/api/delete-user/${Id}`, {
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


    // Delete Contact
    const DeleteContact = async (Id) => {
        try {
            const res = await fetch(`http://localhost:3000/admin/api/delete-user-contact/${Id}`, {
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


    // Delete Enquiry
    const DeleteEnq = async (Id) => {
        try {
            const res = await fetch(`http://localhost:3000/admin/api/delete-enquiry/${Id}`, {
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



     // Delete Room
     const DeleteRoom = async (Id) => {
        try {
            const res = await fetch(`http://localhost:3000/admin/api/delete-room/${Id}`, {
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


       // Delete Room Booking
       const DeleteBooking = async (Id) => {
        try {
            const res = await fetch(`http://localhost:3000/admin/api/delete-booking/${Id}`, {
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
        if(item.booking_status === 'Pending'){
        const res = await fetch(`http://localhost:3000/admin/api/approved-booking/${id}`, {
            method:"PUT"
        })

        if(res.status === 200){
            toast.success('Booking Approved Successfully')
        }
    }else{
        toast.error("Booking is allready Approved")
    }
    } catch (error) {
        console.error('error from approved booking',error);
    }
}



    useEffect(() => {
        if (localStorage.getItem('admintoken')) {
            currentLogin();
            showAllRooms();
            showAllUsers();
            showAllcontacts();
            showAllenquires();
            showAllbooking();
        } else {
            navigate('/login')
        }
    }, [])

    return (
        <>

            <div className="Admin-body">
                <div className="admin_container">
                    {/* Sidebar */}
                    <nav className="sidebar">
                        <ul>
                            <li>
                                <Link onClick={() => showSection('dashboard')}>Dashboard</Link>
                            </li>
                            <li>
                                <Link onClick={() => showSection('contact')}>Contact</Link>
                            </li>
                            <li>
                                <Link onClick={() => showSection('enquiry')}>Enquiry</Link>
                            </li>
                            <li>
                                <Link onClick={() => showSection('user')}>Users</Link>
                            </li>
                            <li>
                                <Link onClick={() => showSection('room')}>Rooms</Link>
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
                        {
                            admins.role === 1 ? 

                                <div className="dashboard-cards">
                                    <Link to={`/admin/booking-table`} className='Link'>
                                        <div className="card">
                                            <h3>{Rooms.filter((item) => item.room_booking_status == 'unavailable').length}</h3>
                                            <p>Room Booked</p>
                                        </div>
                                    </Link>
                                    <Link to={`/admin/room-table`} className='Link' >
                                        <div className="card">
                                            <h3>{Rooms.filter((item) => item.room_booking_status == 'available').length}</h3>
                                            <p>Room UnBook</p>
                                        </div>
                                    </Link>
                                    <Link to={`/admin/room-table`} className='Link'>
                                        <div className="card">
                                            <h3>{Rooms.length}</h3>
                                            <p>Total Rooms</p>
                                        </div>
                                    </Link>
                                    <Link to={`/admin/booking-table`} className='Link'>
                                        <div className="card">
                                            <h3>{booking.filter((item) => item.booking_status == 'Pending').length}</h3>
                                            <p>Booking Pending</p>
                                        </div>
                                    </Link>
                                    <Link to={`/admin/user-table`} className='Link'>
                                        <div className="card">
                                            <h3>{users.length}</h3>
                                            <p>Registered Users</p>
                                        </div>
                                    </Link>
                                    <Link to={`/admin/enquiry-table`} className='Link'>
                                        <div className="card">
                                            <h3>{enq.length}</h3>
                                            <p>Total Enquiry</p>
                                        </div>
                                    </Link>
                                    <Link to={`/admin/contact-table`} className='Link'>
                                        <div className="card">
                                            <h3>{contacts.length}</h3>
                                            <p>Total Contacts</p>
                                        </div>
                                    </Link>
                                </div>
                                :
                                ""

                        }
                    </div>
                    {/* Contact Section */}
                    <div id="contact" className="main-content">
                        {
                            admins.role === 1 ?
                                contacts.length < 1 ? <h2>NO ANY CONTACT</h2> :
                                    <div className="table-admin_container">
                                        <h2 className="table-content">Contact</h2>
                                        <table className="table">
                                            <thead>
                                                <tr className="tr">
                                                    <th className="th">Sr. No.</th>
                                                    <th className="th">Name</th>
                                                 
                                                    <th className="th">Email ID</th>
                                                    <th className="th">Message</th>
                                                    <th className="th">Update</th>
                                                    <th className="th">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {

                                                    contacts.map((item, i) => {
                                                        return (
                                                            <tr className="tr" key={i}>
                                                                <td className="td">{i + 1}</td>
                                                                <td className="td">{item.name}</td>
                                                             
                                                                <td className="td">{item.email}</td>
                                                                <td className="td">{item.message}</td>
                                                                <td className="td"><Link to={`/admin/update-contact/${item._id}`} className='Link'>Update</Link></td>
                                                                <td className="td"><button style={{ height: "40px", width: "80px", fontSize: "16px", background: "#002233", color: "#fff", cursor: "pointer", borderRadius: "5px" }} onClick={() => DeleteContact(item._id)}>Delete</button></td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                :
                                ""
                        }

                    </div>
                    {/* Enquiry Section */}
                    <div id="enquiry" className="main-content">
                        {
                            admins.role === 1 ?
                                enq.length < 1 ? "NO ANY ENQUIRY" :
                                    <div className="table-admin_container">
                                        <h2 className="table-content">Enquiry</h2>
                                        <table className="table">
                                            <thead>
                                                <tr className="tr">
                                                    <th className="th">Sr. No.</th>
                                                    <th className="th">Name</th>
                                                    <th className="th">Phone No.</th>
                                                    <th className="th">Email ID</th>
                                                    <th className="th">Message</th>
                                                    <th className="th">Update</th>
                                                    <th className="th">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    enq.map((item, index) => {
                                                        return (
                                                            <tr className="tr" key={index}>
                                                                <td className="td">{index + 1}</td>
                                                                <td className="td">{item.name}</td>
                                                                <td className="td">{item.phone}</td>
                                                                <td className="td">{item.email}</td>
                                                                <td className="td">{item.message}</td>
                                                                <td className="td"><Link to={`/admin/update-enquiry/${item._id}`} className='Link'>Update</Link></td>
                                                                <td className="td"><button style={{ height: "40px", width: "80px", fontSize: "16px", background: "#002233", color: "#fff", cursor: "pointer", borderRadius: "5px" }} onClick={() => DeleteEnq(item._id)}>Delete</button></td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                :
                                ""

                        }

                    </div>
                    {/* User Section */}
                    <div id="user" className="main-content">
                        {
                            admins.role === 1 ?
                                users.length < 1 ? "NO ANY USER FOUND" :
                                    <div className="table-admin_container">
                                        <h2 className="table-content">Users</h2>
                                        <table className="table">
                                            <thead>
                                                <tr className="tr">
                                                    <th className="th">Sr. No.</th>
                                                    <th className="th">First Name</th>
                                                    <th className="th">Last Name</th>
                                                    <th className="th">Phone No.</th>
                                                    <th className="th">Email ID</th>
                                                    <th className="th">Aadhar No.</th>
                                                    <th className="th">Profile Image</th>
                                                    <th className="th">Role</th>
                                                    <th className="th">Update</th>
                                                    <th className="th">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    users.map((item, index) => {
                                                        return (
                                                            <tr className="tr" key={index}>
                                                                <td className="td">{index + 1}</td>
                                                                <td className="td">{item.fname}</td>
                                                                <td className="td">{item.lname}</td>
                                                                <td className="td">{item.phone}</td>
                                                                <td className="td">{item.email}</td>
                                                                <td className="td">{item.aadhar_number}</td>
                                                                <td className="td"><img src={`http://localhost:3000/${item.profile}`} alt="profile" style={{ height: "70px", width: "70px", borderRadius: "100%" }} /></td>
                                                                <td className="td">{item.role}</td>
                                                                <td className="td"><Link to={`/admin/update-user/${item._id}`} className='Link'>Update</Link></td>
                                                                <td className="td"><button style={{ height: "40px", width: "80px", fontSize: "16px", background: "#002233", color: "#fff", cursor: "pointer", borderRadius: "5px" }} onClick={() => DeleteUser(item._id)}>Delete</button></td>

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
                    {/* Room Section */}
                    <div id="room" className="main-content">
                        {
                            admins.role === 1 ?
                               
                                    <div className="table-admin_container">
                                        <h2 className="table-content">Rooms</h2>
                                        <Link to={`/admin/add-room`} className='addRoom'>ADD ROOM</Link> &nbsp;
                                        <Link to={`/admin/add-category`} className='addRoom'>ADD ROOM</Link>
                                        <table className="table">
                                            <thead>
                                                <tr className="tr">
                                                    <th className="th">Sr. No.</th>
                                                    <th className="th">Room No.</th>
                                                    <th className="th">Room image.</th>
                                                    <th className="th">Category</th>
                                                    <th className="th">Description</th>
                                                    <th className="th">Price</th>
                                                    <th className="th">Total Beds</th>
                                                    <th className="th">Capacity</th>
                                                    <th className="th">Room Bookig Status</th>
                                                    <th className="th">Update</th>
                                                    <th className="th">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Rooms.map((item, index) => {
                                                        return (
                                                            <tr className="tr" key={index}>
                                                                <td className="td">{index + 1}</td>
                                                                <td className="td">{item.room_number}</td>
                                                                <td className="td"><img src={`http://localhost:3000/${item.room_image}`} alt="room" style={{ height: "70px", width: "70px" }} /></td>
                                                                <td className="td">{item.room_category}</td>
                                                                <td className="td">{item.room_description}</td>
                                                                <td className="td">{item.room_price}</td>
                                                                <td className="td">{item.total_beds}</td>
                                                                <td className="td">{item.capacity}</td>
                                                                <td className="td">{item.room_booking_status}</td>
                                                                <td className="td"><Link to={`/admin/update-room/${item._id}`} className='Link'>Update</Link></td>
                                                                <td className="td"><button style={{ height: "40px", width: "80px", fontSize: "16px", background: "#002233", color: "#fff", cursor: "pointer", borderRadius: "5px" }} onClick={() => DeleteRoom(item._id)}>Delete</button></td>
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
                    {/* Booking Section */}
                    <div id="booking" className="main-content" >
                        {
                            admins.role === 1 ?
                                booking.length < 1 ? "NO BOOKING FOUND" :
                                    <div className="table-admin_container">
                                        <h2 className="table-content">Booking</h2>
                                        <table className="table" >
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
                                                    <th className="th">CheckIn Date</th>
                                                    <th className="th">CheckOut Date</th>
                                                    <th className="th">Booking Date</th>
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
                                                                <td className="td"><img src={`http://localhost:3000/${item.room_image}`} alt="room" style={{ height: "60px", width: "60px" }} /></td>
                                                                <td className="td">{item.check_in_date}</td>
                                                                <td className="td">{item.check_out_date}</td>
                                                                <td className="td">{item.booking_date}</td>
                                                                <td className="td">{item.booking_status}</td>
                                                                <td className="td"><button style={{ height: "40px", width: "80px", fontSize: "16px", background: "#002233", color: "#fff", cursor: "pointer", borderRadius: "5px" }} onClick={() => ApprovedBooking(item._id, item)}>Approved</button></td>
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
            {/* ------------------------------- */}
        </>

    )
}

export default AdminDashboard