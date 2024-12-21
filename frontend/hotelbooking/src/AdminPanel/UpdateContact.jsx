import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const UpdateContact = () => {

  const { id } = useParams();
  const navigate = useNavigate()

  const [updateContact, setUpdateContact] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  })


  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setUpdateContact({
      ...updateContact,
      [name]: value
    })

  }


  //update contact data

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://hotelbooking-zs0a.onrender.com/admin/api/update-user-contact/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admintoken')}`
        },
        body: JSON.stringify(updateContact)
      })

      if (res.status === 200) {
        toast.success('Updated Successfully')
        navigate('/admin/dashboard')
      } else {
        toast.error('Somethings went wrong');
        navigate('/admin/dashboard')
      }
    } catch (error) {
      console.error('error from update contact', error);
    }
  }



  // show contact data on when page is load
  useEffect(() => {
    const showContact = async () => {
      try {
        const res = await fetch(`https://hotelbooking-zs0a.onrender.com/admin/api/get-contact-id/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admintoken')}`
          }
        })

        if (res.status == 200) {
          const conData = await res.json();
          setUpdateContact({
            name: conData.contact.name,
            phone: conData.contact.phone,
            email: conData.contact.email,
            message: conData.contact.message
          })
        }
      } catch (error) {
        console.error('error from show contact data', error);
      }
    }

    showContact();
  }, [])


  return (
    <div className="main-containers">
      <form onSubmit={handleUpdate}>
        <h2 className="reg-heading">UPDATE CONTACT</h2>

        <div className="input-row">
          <div className="input-box">
            <label htmlFor="name" className="reg-label">Name:</label>
            <input type="text" name="name" className="reg-input" value={updateContact.name} onChange={handleChange} />
          </div>
          <div className="input-box">
            <label htmlFor="lastName" className="reg-label">Phone:</label>
            <input type="text" name="phone" className="reg-input" value={updateContact.phone} onChange={handleChange} />
          </div>
        </div>

        <div className="input-row">
          <div className="input-box">
            <label htmlFor="email" className="reg-label">Email:</label>
            <input type="text" name="email" className="reg-input" value={updateContact.email} onChange={handleChange} />
          </div>
          <div className="input-box">
            <label htmlFor="message" className="reg-label">Message:</label>
            <input type="message" name="message" className="reg-input" value={updateContact.message} onChange={handleChange} />
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

export default UpdateContact