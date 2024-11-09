import React, { useState } from 'react';
import '../Style/ContactUs.css';
import { toast } from 'react-toastify';

const Contact = () => {

    const [contactus, setContactUs] = useState({
        name:"",
        email:"",
        message:""
    })


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setContactUs({
            ...contactus,
            [name]:value
        })
    }

    const handleContactUs = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/client/contact-us`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(contactus)
            })

            if(res.status === 201){
                toast.success("Contact Successfully");
                setContactUs({name:"",email:"",message:""});
            }else{
                toast.error("Error from contact us, please try again later");
                setContactUs({name:"",email:"",message:""});
            }
        } catch (error) {
            console.error('error from contact us frontend',error);
        }
    }


  return (
   
    <>
  <div className="contact-main-container" data-aos="fade-right">
    <div className="contact-address">
      <h5 className="cont-heading">Contact Us</h5>
      <div className="cont-add-details">
        <i className="fa-solid fa-location-dot" />
        <h6>Address</h6>
      </div>
      <div className="cont-para">
        <p>
          In front of Rajarshi Dashrath Rajkiya Medical College, Darshan Nagar,
          Kushmaha, Ayodhya, Uttar Pradesh 224135.
        </p>
      </div>
      <div className="cont-add-details">
        <i className="fa-solid fa-phone" />
        <h6>Phone</h6>
      </div>
      <div className="cont-para">
        <p>
          +91 7800050976
          <br />
          +91 8090995797
        </p>
      </div>
      <div className="cont-add-details">
        <i className="fa-solid fa-envelope" />
        <h6>Email</h6>
      </div>
      <div className="cont-para">
        <p>techsimatraining@gmail.com</p>
      </div>
    </div>
    <div className="contact-form">
      <form onSubmit={handleContactUs} className="contact-form-container">
        <div className="contact-header-box">
          <h2 className="contact-log-header">Send a Message</h2>
        </div>
        <div className="contact-input-box">
          <label htmlFor="name" className="contact-log-lebel">
            Name
          </label>
          <i className="fa-solid fa-envelope contact-icon" />
          <input
            type="text"
            id="name"
            name="name"
            className="contact-log-input"
            value={contactus.name}
            onChange={handleChange}
            required
            placeholder="Name"
          />
        </div>
        <div className="contact-input-box">
          <label htmlFor="email" className="contact-log-lebel">
            E-mail
          </label>
          <i className="fa-solid fa-lock contact-icon" />
          <input
            type="email"
            id="email"
            name="email"
            className="contact-log-input"
            value={contactus.email}
            onChange={handleChange}
            required
            placeholder="Email"
          />
        </div>
        <div className="contact-input-box">
          <label htmlFor="message" className="contact-log-lebel">
            Message
          </label>
          <i className="fa-solid fa-message" />
          <textarea
            name="message"
            id="message"
            cols={20}
            rows={3}
            value={contactus.message}
            onChange={handleChange}
            className="contact-log-input"
            placeholder="Enter message here"
            required
            
          />
        </div>
        <div className="contact-button">
          <button className="contact-login-button">Send Message</button>
        </div>
        <div className="contact-social-media">
          <i className="fa-brands fa-facebook" />
          <i className="fa-brands fa-instagram" />
          <i className="fa-brands fa-linkedin" />
          <i className="fa-brands fa-twitter" />
        </div>
      </form>
    </div>
  </div>
</>

  )
}

export default Contact