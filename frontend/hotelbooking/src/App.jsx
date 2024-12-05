import React from 'react'
import Registration from './Components/Registration'
import AdminDashboard from './AdminPanel/AdminDashboard'
import UserTable from './AdminPanel/UserTable'
import Login from './Components/Login'
import RoomTable from './AdminPanel/RoomTable'
import Profile from './Components/Profile'
import Contacts from './AdminPanel/Contacts'
import EnquiryTable from './AdminPanel/EnquiryTable'
import BookingTable from './AdminPanel/BookingTable'
import UpdateUserData from './AdminPanel/UpdateUserData'
import UpdateRoomData from './AdminPanel/UpdateRoomData'
import UpdateEnquiry from './AdminPanel/UpdateEnquiry'
import UpdateContact from './AdminPanel/UpdateContact'
import AddRoom from './AdminPanel/AddRoom'
import Home from './Components/Home'
import Room_Detail from './Components/Room_Detail'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Gallery from './Components/Gallery'
import About from './Components/About'
import Error from './Components/Error'
import MyBooking from './Components/MyBooking'
import ViewBookingRoom from './Components/ViewBookingRoom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import TypesRoom from './Components/TypesRoom'
import AddCategory from './AdminPanel/AddCategory'
import Contact from './Components/Contact'
import GetSearchRoom from './Components/GetSearchRoom'
import UpdateBooking from './AdminPanel/UpdateBooking'
import 'react-calendar/dist/Calendar.css';
import ForgetPassword from './Components/ForgetPassword'
import ResetPassword from './Components/ResetPassword'



// for Routing -> Pakage Name is react-router-dom
const router = createBrowserRouter([
  {
    path: '/',
    element: <div>
      <Header />
      <Home />
      <Footer />
    </div>
  },
  {
    path: '/about',
    element: <div>
      <Header />
      <About />
      <Footer />
    </div>
  },
  {
    path: '/gallery',
    element: <div>
      <Header />
      <Gallery />
      <Footer />
    </div>
  },
  {
    path: '/signup',
    element: <div>
      <Header />
      <Registration />
      <Footer />
    </div>
  },
  {
    path: '/login',
    element: <div>
      <Header />
      <Login />
      <Footer />
    </div>
  },
  {
    path: '/forget-password',
    element: <div>
      <Header />
      <ForgetPassword />
      <Footer />
    </div>
  },
  {
    path: '/reset-password/:id/:token',
    element: <div>
      <Header />
      <ResetPassword />
      <Footer />
    </div>
  },
  {
    path: '/profile',
    element: <div>
      <Header />
      <Profile />
      <Footer />
    </div>
  },
  {
    path: '/detail_room/:id',
    element: <div>
      <Header />
      <Room_Detail />
      <Footer />
    </div>
  },
  {
    path: '/booking',
    element: <div>
      <Header />
      <MyBooking />
      <Footer />
    </div>
  },
  {
    path: '/search_rooms',
    element: <div>
      <Header />
      <GetSearchRoom />
      <Footer />
    </div>
  },
  {
    path: '/contactus',
    element: <div>
      <Header />
      <Contact />
      <Footer />
    </div>
  },
  {
    path: '/types_rooms/:roomType',
    element: <div>
      <Header />
      <TypesRoom />
      <Footer />
    </div>
  },
  {
    path: '/view_booking_room/:id',
    element: <div>
      <Header />
      <ViewBookingRoom />
      <Footer />
    </div>
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />
  },
  {
    path: '/admin/user-table',
    element: <UserTable />
  },
  {
    path: '/admin/room-table',
    element: <RoomTable />
  },
  {
    path: '/admin/contact-table',
    element: <Contacts />
  },
  {
    path: '/admin/enquiry-table',
    element: <EnquiryTable />
  },
  {
    path: '/admin/booking-table',
    element: <BookingTable />
  },
  {
    path: '/admin/update-booking/:id',
    element: <UpdateBooking />
  },
  {
    path: '/admin/update-user/:id',
    element: <UpdateUserData />
  },
  {
    path: '/admin/update-room/:id',
    element: <UpdateRoomData />
  },
  {
    path: '/admin/update-enquiry/:id',
    element: <UpdateEnquiry />
  },
  {
    path: '/admin/update-contact/:id',
    element: <UpdateContact />
  },
  {
    path: '/admin/add-room',
    element: <AddRoom />
  },
  {
    path: '/admin/add-category',
    element: <AddCategory />
  },
  // 404 Error page, Page not found
  {
    path: '*',
    element: <div>
      <Header />
      <Error />
      <Footer />
    </div>
  }

])

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
