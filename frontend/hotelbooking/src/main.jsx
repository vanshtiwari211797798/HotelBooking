import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
// import {BallTriangle} from 'react-loader-spinner'
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
theme="colored"
transition: Bounce
/>
{/* <BallTriangle

  /> */}
  </>
)
