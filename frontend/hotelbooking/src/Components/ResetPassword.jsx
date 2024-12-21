import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {id, token} = useParams();

 // handle reset password

 const handleSubmit = async (e) => {
  e.preventDefault();
      
  try {
      const res = await fetch(`https://hotelbooking-zs0a.onrender.com/client/reset-password/${id}/${token}`, {
          method:"POST",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({password})
      })

    
      if(res.status === 200){
          navigate('/login')
          toast.success("Password reset successfully", {
            autoClose:2000
          })
      }
      
  } catch (error) {
      console.error('error from reset password', error);
      
  }
}
  return (
  <>
       <div className="forget-password-wrapper">
                <div className="forget-password-container">
                    <form className="forget-password-form" onSubmit={handleSubmit}>
                        <h2>Reset Password</h2>
                        <input
                            type="text"
                            placeholder="Enter new password"
                            name='password'
                            className="email-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="submit-button">Reset</button>
                    </form>
                </div>
            </div>
  </>
  )
}

export default ResetPassword