import React, { useState, useEffect } from 'react'
import '../Style/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const navigate = useNavigate();


    const [login, setLogin] = useState({
        email:'',
        password:''
    });


    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        setLogin({
            ...login,
            [name]:value
        })
    }


    const handleLoginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/client/login`,login)

            if(res.status === 200){
                localStorage.setItem('usertoken',res.data.token)
                toast.success("Login Successfully")
                setLogin({email:"",password:""});
                navigate("/profile");
            }else if(res.status === 201){
                localStorage.setItem('admintoken',res.data.token)
                toast.success("Login Successfully")
                setLogin({email:"",password:""});
                navigate("/admin/dashboard");
            }else{
                toast.error("Somethings went wrong")
                setLogin({email:"",password:""});
            }
        } catch (error) {
            if(error.response){
     
                if(error.response.status === 400){
                    toast.error("All field is required")
                }else{  
                    toast.error("Invalid Creadential")
                    setLogin({email:"",password:""});
                }
            }else{
                toast.error("Internal Server Error")
                setLogin({email:"",password:""});
                navigate("/");
            }
        }
    }

    useEffect(() => {
        if (localStorage.getItem('usertoken')) {
            navigate("/");
        }
    }, [])
    return (
        <>
           <div className="login-container">
      <h2 className="login-title">Login to continue.</h2>
      <p className="login-subtitle">Enter your login credentials.</p>
      <form className="login-form" onSubmit={handleLoginUser}>
        <div className="input-group">
          <label htmlFor="email" className="input-label">Email address</label>
          <input
            type="email"
            id="email"
            name='email'
            onChange={handleChange}
            className="input-field"
            value={login.email}
            placeholder="Enter email address"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="input-label">Password</label>
          <div className="password-group">
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={login.password}
              name='password'
              className="input-field"
              placeholder="Enter your password"
            />
            <Link to={`#`} className="forgot-link">Forgot?</Link>
          </div>
        </div>
        <button type="submit" className="login-button">Login securely</button>
      </form>
      <p className="register-text">
        Don't have an account? <Link to={`/signup`} className="register-link">Register for free</Link>
      </p>

    </div>
        </>

    )
}

export default Login