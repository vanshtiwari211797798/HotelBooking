import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';



const UpdateEnquiry = () => {

  const [enquiry, setEnq] = useState({
    name:"",
    phone:"",
    email:"",
    message:""
  })

    // recieve id which come from params / paramiter
    const {id} =useParams();
    const navigate = useNavigate();


    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setEnq({
          ...enquiry,
          [name]:value
        })
    }



    // update enquiry data

    const handleUpdate = async (e) => {
        e.preventDefault();
      try {
        const res = await fetch(`https://hotelbooking-zs0a.onrender.com/admin/api/update-enquiry/${id}`, {
          method:"PUT",
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${localStorage.getItem('admintoken')}`
          },
          body:JSON.stringify(enquiry)
        })

        if(res.status === 200){
          toast.success('Updated Successfully')
          navigate('/admin/dashboard')
        }else{
          toast.error('Somethings went wrong');
          navigate('/admin/dashboard')
        }
      } catch (error) {
        console.error('error from update enquiry', error);
      }
    }

   // show enquiry data on when page is load
   useEffect(() => {
    const showEnquiry = async () => {
        try {
            const res = await fetch(`https://hotelbooking-zs0a.onrender.com/admin/api/get-enquiry-id/${id}`, {
                method:"GET",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('admintoken')}`
                }
            })

            if(res.status == 200){
                const enqData = await res.json();
                setEnq({
                  name:enqData.enq.name,
                  phone:enqData.enq.phone,
                  email:enqData.enq.email,
                  message:enqData.enq.message
                })
            }
        } catch (error) {
            console.error('error from show enquiry data', error);
        }
    }

    showEnquiry();
},[])


  return (
    <div className="main-containers">
    <form onSubmit={handleUpdate}>
      <h2 className="reg-heading">UPDATE ENQUIRY</h2>

      <div className="input-row">
        <div className="input-box">
          <label htmlFor="name" className="reg-label">Name:</label>
          <input type="text" name="name" className="reg-input"  value={enquiry.name} onChange={handleChange}/>
        </div>
        <div className="input-box">
          <label htmlFor="lastName" className="reg-label">Phone:</label>
          <input type="text" name="phone" className="reg-input"  value={enquiry.phone} onChange={handleChange}/>
        </div>
      </div>

      <div className="input-row">
        <div className="input-box">
          <label htmlFor="email" className="reg-label">Email:</label>
          <input type="text" name="email" className="reg-input"  value={enquiry.email} onChange={handleChange}/>
        </div>
        <div className="input-box">
          <label htmlFor="message" className="reg-label">Message:</label>
          <input type="message" name="message" className="reg-input" value={enquiry.message} onChange={handleChange}/>
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

export default UpdateEnquiry