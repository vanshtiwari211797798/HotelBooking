import React, { useState } from 'react';
import '../Style/ContactUs.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Contact = () => {

    const [contactus, setContactUs] = useState({
        name:"",
        email:"",
        message:""
    })
    const [nameErr, setNameErr] = useState(false);

    const [EmailErr, setEmailErr] = useState(false);


    const handleMessageChange = (e) => {
        const name = e.target.name
        const value = e.target.value

          setContactUs({
            ...contactus,
            [name]:value
        })
    }
    

       // handle input field name, if user enter any number or special symbol in input field
    const handleNameChange = (e) => {
      const name = e.target.name
      const value = e.target.value

      if(/^[a-zA-Z\s]*$/.test(value)){
        setNameErr(false);
        setContactUs({
          ...contactus,
          [name]:value
      })
      }else{
        setNameErr(true);
      }

      
    } 

   // handle input field name, if user not enter character and alphabet which required in email field

    function handleEmailChange(e) {
      const name = e.target.name
      const value = e.target.value

      setContactUs({
        ...contactus,
        [name]:value
    })

      if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)){
        setEmailErr(false);

      }else{
        setEmailErr(true);
      }
  }



    const handleContactUs = async (e) => {
        e.preventDefault();
        try {
          if(!contactus.name || !contactus.email || !contactus.message){
            setNameErr(true)
            setEmailErr(true)
          }else{
            setNameErr(false)
            setEmailErr(false)
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
        <Link className='p' to={`https://maps.app.goo.gl/2ER5FbBjeA94M1ce7`}>
          In front of Rajarshi Dashrath Rajkiya Medical College, Darshan Nagar,
          Kushmaha, Ayodhya, Uttar Pradesh 224135.
        </Link>
      </div>
      <div className="cont-add-details">
        <i className="fa-solid fa-phone" />
        <h6>Phone</h6>
      </div>
      <div className="cont-para">
        <Link className='p' to={`tel:+91 7800050976`}>
          +91 7800050976
          <br />
          +91 8090995797
        </Link>
      </div>
      <div className="cont-add-details">
        <i className="fa-solid fa-envelope" />
        <h6>Email</h6>
      </div>
      <div className="cont-para">
        <Link className='p' to={`mailto:techsimatraining@gmail.com`}>techsimatraining@gmail.com</Link>
      </div>
    </div>
    <div className="contact-form">
      <form onSubmit={handleContactUs} className="contact-form-container">
        <div className="contact-header-box">
          <h2 className="contact-log-header">Contact us</h2>
        </div>
        <div className="contact-input-box">
          <label htmlFor="name" className="contact-log-lebel">
            Name
          </label>
          <i className="fa fa-user" />
          <input
            type="text"
            id="name"
            name="name"
            className="contact-log-input"
            value={contactus.name}
            onChange={handleNameChange}
            
            placeholder="Enter your name"
          /> <br />
          <span>{nameErr ? 'Enter valid name' : ''}</span>
        </div>
        <div className="contact-input-box">
          <label htmlFor="email" className="contact-log-lebel">
            E-mail
          </label>
          <i className="fa fa-envelope" />
          <input
            type="email"
            id="email"
            name="email"
            className="contact-log-input"
            value={contactus.email}
            onChange={handleEmailChange}
            
            placeholder="Enter your email"
          /> <br />
          <span>{EmailErr ? 'Enter valid email' : ''}</span>
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
            onChange={handleMessageChange}
            className="contact-log-input"
            placeholder="Enter message here"
            
            
          />
        </div>
        <div className="contact-button">
          <button className="contact-login-button">Send Message</button>
        </div>
        <div className="contact-social-media">
          <span>Contact us for support, feedback via email, phone, or form!</span>
        </div>
      </form>
    </div>
  </div>
</>

  )
}

export default Contact