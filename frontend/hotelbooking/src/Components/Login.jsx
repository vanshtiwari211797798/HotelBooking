import React, { useState, useEffect, useRef } from 'react'
import '../Style/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import hideIcon from '../Images/hide.png'
import showIcon from '../Images/shared-vision.png'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    // for showing hide and show eye icon if password type number or password, current icon is hideIcon
    const [eyeIcon, setEyeIcon] = useState(hideIcon);

    const navigate = useNavigate();


    const [login, setLogin] = useState({
        email: '',
        password: ''
    });


    // exicute function when if user type any alphabet or etc in email and password field of login 
    const handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value

        setLogin({
            ...login,
            [name]: value
        })
    }

    // useRef hook for change password hide and show icon functionality using Ref
    const PassWordRef = useRef();

    // when user click on eye icon the this function will execute
    const handleChangePassChange = () => {
        if (eyeIcon === hideIcon) {
            setEyeIcon(showIcon);
            PassWordRef.current.type = 'text';
        } else {
            setEyeIcon(hideIcon);
            PassWordRef.current.type = 'password';
        }
    }

    // when user click on login button the the function will exucate
    const handleLoginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://hotelbooking-zs0a.onrender.com/client/login`, login)

            if (res.status === 200) {
                localStorage.setItem('usertoken', res.data.token)
                setLogin({ email: "", password: "" });
                navigate("/profile");
                toast.success("Login Successfully", {
                    autoClose:2000,
                    onClose:() => {
                        window.location.reload();
                    }
                })
            } else if (res.status === 201) {
                localStorage.setItem('admintoken', res.data.token)
                setLogin({ email: "", password: "" });
                navigate("/admin/dashboard");
                toast.success("Login Successfully", {
                    autoClose:2000,
                    onClose:() => {
                        window.location.reload();
                    },
                })
            } else {
                toast.error("Somethings went wrong")
                setLogin({ email: "", password: "" });
            }
        } catch (error) {
            if (error.response) {

                if (error.response.status === 400) {
                    toast.error("All field is required")
                } else {
                    toast.error("Invalid Creadential")
                    setLogin({ email: "", password: "" });
                }
            } else {
                toast.error("Internal Server Error")
                setLogin({ email: "", password: "" });
                navigate("/");
            }
        }
    }

    // when the pade is Rerender then the function will executed, the function check that if token is available in localstorage, if token is not available then the function redirect user to home page
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
                        <img src={eyeIcon} alt="eye-icon" className='close-eye' onClick={handleChangePassChange} />
                        <div className="password-group">
                            <input
                                type="password"
                                id="password"
                                onChange={handleChange}
                                value={login.password}
                                ref={PassWordRef}
                                name='password'
                                className="input-field password"
                                placeholder="Enter your password"
                            />
                            <Link to={`/forget-password`} className="forgot-link">Forgot?</Link>
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