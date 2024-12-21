import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'



const RoomTable = () => {

    const navigate = useNavigate();
    const [Rooms, setRooms] = useState([])
    const [admins, setAdmin] = useState('')



    // Api for showing all rooms
    const showAllRooms = async () => {
        try {
            const res = await fetch(`https://hotelbooking-zs0a.onrender.com/admin/api/get-all-room`, {
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
        showSection('room');
    }, [])


    useEffect(() => {


        if (localStorage.getItem('admintoken')) {
            currentLogin();
            showAllRooms();
        } else {
            navigate('/')
        }
    }, [])


       // Delete Room
       const DeleteRoom = async (Id) => {
        try {
            const res = await fetch(`https://hotelbooking-zs0a.onrender.com/admin/api/delete-room/${Id}`, {
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
                                <Link onClick={() => showSection('room')}>Rooms</Link>
                            </li>

                            <input className="i-but" type="button" defaultValue="Logout" onClick={Logout} />
                        </ul>
                    </nav>
                    {/* Main Content Sections */}
                    <div id="dashboard" className="main-content">
                        <header className="header">
                            <h2> Admin Dashboard</h2>
                        </header>

                    </div>
                    {/* Room Section */}
                    <div id="room" className="main-content">
                        {
                            admins.role === 1 ?
                              
                                    <div className="table-admin_container">
                                        <h2 className="table-content">Rooms</h2>
                                        <Link to={`/admin/add-room`} className='addRoom'>ADD ROOM</Link>
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
                                                                <td className="td"><img src={`https://hotelbooking-zs0a.onrender.com/${item.room_image}`} alt="room" style={{ height: "70px", width: "70px" }} /></td>
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
                </div>
            </div>
        </>
    )
}

export default RoomTable