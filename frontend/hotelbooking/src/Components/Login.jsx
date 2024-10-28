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
                console.log('hello')
            }else{
                toast.error("Somethings went wrong")
                setLogin({email:"",password:""});
                navigate("/");
            }
        } catch (error) {
            if(error.response){
     
                if(error.response.status === 400){
                    toast.error("All field is required")
                }else{
                    console.log(error.response.status)  
                    toast.error("Invalid Creadential")
                    setLogin({email:"",password:""});
                    navigate("/");
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

            <>

                <div className="login-main_container">
                    <div className="login-form">
                        <form onSubmit={handleLoginUser} className="login-form-container">
                            <div className="login-header-box">
                                <h2 className="log-header">LOGIN</h2>
                            </div>
                            <div className="login-welcome">
                                <h1>Welcome Back!</h1>
                                <p>USER LOGIN</p>
                            </div>
                            <div className="log-input-box">
                                <label htmlFor="email" className="log-lebel">
                                    E-mail
                                </label>
                                <i className="fa-solid fa-envelope icon" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={login.email}
                                    onChange={handleChange}
                                    className="log-input"
                                    
                                />
                            </div>
                            <div className="log-input-box">
                                <label htmlFor="password" className="log-lebel">
                                    Password
                                </label>
                                <i className="fa-solid fa-lock log-icon" />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={login.password}
                                    onChange={handleChange}
                                    className="log-input"
                                   
                                />
                            </div>
                            {/* <div className="login-forget">
                                <Link to="">Forget Password?</Link>
                            </div> */}
                            <div className="log-button">
                                <button className="login-button">LOGIN</button>
                            </div>
                            <div className="reg-link">
                                <p>

                                    Don't Have an a Account? <Link to="/signup">Register Here</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </>



        </>

    )
}

export default Login