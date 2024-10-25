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
import PvtUserComponent from './Components/PvtUserComponent'
import AdminPvtComp from './AdminPanel/AdminPvtComp'
import UpdateUserData from './AdminPanel/UpdateUserData'
import UpdateRoomData from './AdminPanel/UpdateRoomData'
import UpdateEnquiry from './AdminPanel/UpdateEnquiry'
import UpdateContact from './AdminPanel/UpdateContact'
import AddRoom from './AdminPanel/AddRoom'
import Home from './Components/Home'
import Room_Detail from './Components/Room_Detail'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './Components/Gallery'
import About from './Components/About'
import Error from './Components/Error'
import MyBooking from './Components/MyBooking'
import ViewBookingRoom from './Components/ViewBookingRoom'



const App = () => {


  // $(document).ready(function(){
  //  Codes of jQuery
  // })
  return (
    <>
      <BrowserRouter>

        <Routes>
          
        <Route element={<PvtUserComponent />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/booking' element={<MyBooking />} />
            <Route path='/view_booking_room/:id' element={<ViewBookingRoom />} />
        </Route>


          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/about' element={<About />} />
          <Route path='/detail_room/:id' element={<Room_Detail />} />

          {/* Admin Private Component Start */}
          <Route element={<AdminPvtComp />} >
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/user-table' element={<UserTable />} />
          <Route path='/admin/room-table' element={<RoomTable />} />
          <Route path='/admin/contact-table' element={<Contacts />} />
          <Route path='/admin/enquiry-table' element={<EnquiryTable />} />
          <Route path='/admin/booking-table' element={< BookingTable />} />
          <Route path='/admin/update-user/:id' element={< UpdateUserData />} />
          <Route path='/admin/update-room/:id' element={< UpdateRoomData />} />
          <Route path='/admin/update-enquiry/:id' element={< UpdateEnquiry />} />
          <Route path='/admin/update-contact/:id' element={< UpdateContact />} />
          <Route path='/admin/add-room' element={< AddRoom />} />
          </Route>
          {/* Admin Private Component End */}

          <Route path='*' element={<Error />} />

        </Routes>
    
      </BrowserRouter>
    </>
  )
}

export default App