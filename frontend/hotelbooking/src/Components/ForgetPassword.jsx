import React, {useState} from 'react'
import '../Style/ForgetPaa.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')

    // handle submit email
    const handleSubmit = async (e) => {
        e.preventDefault();
            
        try {
            const res = await fetch(`https://hotelbooking-zs0a.onrender.com/client/forget-password`, {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email})
            })

            if(res.status === 200){
                navigate("/");
                toast.success("Reset link successfully sent on your email address");
            }
        } catch (error) {
            console.error('error from submiting email', error);
            
        }
    }

    return (
        <>
            <div className="forget-password-wrapper">
                <div className="forget-password-container">
                    <form className="forget-password-form" onSubmit={handleSubmit}>
                        <h2>Forget Password</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name='email'
                            className="email-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword