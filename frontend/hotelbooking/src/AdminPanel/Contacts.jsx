import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {toast} from 'react-toastify'



const Contacts = () => {

    const navigate = useNavigate();
    const [contacts, setContacts] = useState([])
    const [admins, setAdmin] = useState('')



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
        showSection('contacts');
    }, [])


    useEffect(() => {


        if (localStorage.getItem('admintoken')) {
            currentLogin();
            showAllcontacts();
        } else {
            navigate('/')
        }
    }, [])


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
                                <Link onClick={() => showSection('contacts')}>Contacts</Link>
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
            {/* Contact Section */}
            <div id="contacts" className="main-content">
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
                </div>
            </div>
        </>
    )
}

export default Contacts