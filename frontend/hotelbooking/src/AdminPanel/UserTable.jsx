import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'


const UserTable = () => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [admins, setAdmin] = useState('')



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
        showSection('user');
    }, [])


    useEffect(() => {


        if (localStorage.getItem('admintoken')) {
            currentLogin();
            showAllUsers();
        } else {
            navigate('/')
        }
    }, [])

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
                                <Link onClick={() => showSection('user')}>Users</Link>
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
                    {/* User Section */}
                    <div id="user" className="main-content">
                        {
                            admins.role === 1 ?
                                users.length < 1 ? <h2>NO ANY USER FOUND</h2>
                                    :
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
                                                                <td className="td">{item.lname ? item.lname : '....'}</td>
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
                </div>
            </div>
        </>
    )
}

export default UserTable