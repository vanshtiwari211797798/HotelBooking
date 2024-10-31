const express = require('express');
const adminrouter = express.Router();
const bcrypt = require('bcryptjs');
const roomModel = require('../RoomsModel/RoomsHotelsModel');
const tokenchecker = require('../Auth/TokenChecker');
const UserModel = require('../UserModel/UserModel');
const ContactModel = require('../ContactModel/ContactModel');
const EnquiryModel = require('../EnquiryModel/EnquiryModel');
const SpecialOfferroomModel = require('../Special_Offers_Model/Special_offersModel');
const roomBookingModel = require('../RoomBookingModel/RoomBooking_Model');
const CategoryModel = require('../RommCategoryModel/RoomCategory');
const multer = require('multer');
const authProfileChecker = require('../Auth/profileauth');
const userModel = require('../UserModel/UserModel');



// admin end point url - http://localhost:3000/admin/api/add-room-category


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbnNoQGdtYWlsLmNvbSIsImlhdCI6MTcyNzI3ODk3NSwiZXhwIjoxNzI3NDUxNzc1fQ.2wyLquF3nKJPId4jhm1iwKv_F64ebKwOqYA4n4W3aJ8



// for uploading Room image
const room = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './rooms')
    },
    filename: function (req, file, cb) {
        // return cb(null, `${Date.now()}-${file.originalname}`);
        return cb(null, `${Date.now()} - ${file.originalname}`)
    }
})


// for uploading profile image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './profiles')
    },
    filename: function (req, file, cb) {
        // return cb(null, `${Date.now()}-${file.originalname}`);
        return cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

// for uploading profile image
const room_category = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './room_category')
    },
    filename: function (req, file, cb) {
        // return cb(null, `${Date.now()}-${file.originalname}`);
        return cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const uploadProfile = multer({ storage: storage })

const upload = multer({ storage: room })

const uploadCategory = multer({ storage: room_category })


//USER PROFILE API FOR SHOWING CURRENT LOGIN ADMIN OR SUB-ADMIN PROFILE
adminrouter.get(('/user-profile'), authProfileChecker, async (req, res) => {
    try {
        const Profile = req.profile;
        return res.status(200).json({ profile: Profile });
    } catch (error) {
        console.error('Unable to fetch admin profile', error);
    }
})



//API FOR ADD HOTEL FROM ADMIN 
adminrouter.post(('/add-room'), tokenchecker, upload.single('room_image'), async (req, res) => {
    try {
        const { room_number, room_category, room_description, room_price, total_beds, capacity } = req.body;
        const room_image = req.file.path;

        if (!room_number || !room_category || !room_image || !room_description || !room_price || !total_beds || !capacity) {
            return res.status(400).json({ msg: "All fields is required" });
        }
        const Room = await roomModel.findOne({ room_number });
        if (Room) {
            return res.status(409).json({ msg: "Room Allready Exit" });
        }
        await roomModel.create({ room_number, room_category, room_image, room_description, room_price, total_beds, capacity });
        return res.status(201).json({ msg: "Room Added Successfully" });


    } catch (error) {
        console.error('error from add room from admin api', error)
    }
})


// Get all hotels Data in admin panel
adminrouter.get(('/get-all-room'), tokenchecker, async (req, res) => {
    try {
        const Rooms = await roomModel.find();

        if (Rooms) {
            return res.status(200).json({ rooms: Rooms });
        }
    } catch (error) {
        console.error('Error from get all room admin', error)
    }
})



// Update hotel from admin
adminrouter.put(('/update-room/:id'), tokenchecker, upload.single('room_image'), async (req, res) => {
    try {

        const { room_number, room_category, room_description, room_price, total_beds, capacity, room_booking_status } = req.body
        const roomId = req.params.id;

        const room = await roomModel.findById(roomId);

        const rooms = await roomModel.findByIdAndUpdate(roomId, { room_number, room_category, room_description, room_price, total_beds, capacity, room_booking_status, room_image: req.file ? req.file.path : room.room_image }, { new: true });

        if (rooms) {
            return res.status(200).json({ roomData: rooms });
        }

    } catch (error) {
        console.error('Error from update Room', error);
    }
})


// Delete hotel from admin panel
adminrouter.delete(('/delete-room/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const Room = await roomModel.findByIdAndDelete(id);

            if (Room) {
                return res.status(200).json({ msg: "Room Deleted Successfully" });
            }
        }
    } catch (error) {
        console.error('Error from delete room', error)
    }
})


// get room by id
adminrouter.get(('/get-room/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const room = await roomModel.findById(id);

            if (room) {
                return res.status(200).json({ Room: room })
            }
        }
    } catch (error) {
        console.error('error from get room by id', error);
    }
})


// add room category 
adminrouter.post(('/add-room-category'), uploadCategory.single('room_category_image'), async (req, res) => {
    try {
        const { room_category_name, room_category_price } = req.body;
        const room_category_image = req.file.path;

        if (!room_category_image || !room_category_name || !room_category_price) {
            return res.status(400).json({ msg: "all field is required" })
        }

        const newCategory = await CategoryModel({ room_category_name, room_category_price, room_category_image });
        await newCategory.save();
        if (newCategory) {
            return res.status(201).json({ msg: "Category added successfully" });
        }


    } catch (error) {
        console.error('error from add room category', error);
    }
})


// get all category
adminrouter.get(('/get-category'), tokenchecker, async (req, res) => {
    try {
        const category = await CategoryModel.find();
        if(category){
            return res.status(200).json({category:category})
        }
    } catch (error) {
        console.error("error from get all category in admin dashboard", error);
    }
})

// add special offer room
adminrouter.post(('/add-special-room'), tokenchecker, async (req, res) => {
    try {

        const { room_number, room_category, room_image, room_description, room_totaloffer_percentage, room_old_price, room_main_price, total_beds, capacity } = req.body;

        if (!room_number || !room_category || !room_image || !room_description || !room_totaloffer_percentage || !room_old_price || !room_main_price || !total_beds || !capacity) {
            return res.status(400).json({ msg: "All field is required" });
        }
        const SpecialRoom = await SpecialOfferroomModel.findOne({ room_number: room_number })

        if (SpecialRoom) {
            return res.status(409).json({ msg: "Room allready Exist" })
        }
        await SpecialOfferroomModel.create({ room_number, room_category, room_image, room_description, room_totaloffer_percentage, room_old_price, room_main_price, total_beds, capacity });
        return res.status(201).json({ msg: "Special Room Added Successfully" })

    } catch (error) {
        console.error('Error from add special room', error)
    }
})


// get special rooms
adminrouter.get(('/get-special-room'), tokenchecker, async (req, res) => {
    try {
        const SpecialRooms = await SpecialOfferroomModel.find();

        if (SpecialRooms) {
            return res.status(200).json({ special_rooms: SpecialRooms });
        }
    } catch (error) {
        console.error('erorr from get special room', error);
    }
})


// update special room by id
adminrouter.put(('/update-special-room/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {

            const Rooms = await SpecialOfferroomModel.findByIdAndUpdate(id, req.body, { new: true });

            if (Rooms) {
                return res.status(200).json({ specialRoom: Rooms });
            }

        }
    } catch (error) {
        console.error('error from update special room by id', error);
    }
})


// delete special room by id
adminrouter.delete(('/delete-special-room/:id'), tokenchecker, async (req, res) => {
    try {

        const id = req.params.id;

        if (id) {
            const response = await SpecialOfferroomModel.findByIdAndDelete(id);

            if (response) {
                return res.status(200).json({ msg: "Special Room Deleted Successfully" })
            }
        }

    } catch (error) {
        console.error('error from delete special room by id', error);
    }
})


// Api for register new user from admin panel
adminrouter.post(('/register'), async (req, res) => {
    try {
        const { fname, lname, phone, email, aadhar_number, password } = req.body;

        if (!fname || !phone || !email || !aadhar_number || !password) {
            return res.status(400).json({ msg: "All field is required" });
        }

        const userExist = await UserModel.findOne({ email });

        if (userExist) {
            return res.status(409).send('User allready Registered, please login');
        }
        const SartRound = 10;
        const hashPassword = await bcrypt.hash(password, SartRound);
        const User = new UserModel({ fname, lname, phone, email, aadhar_number, password: hashPassword });
        await User.save();
        return res.status(201).send('User Register Successfully');


    } catch (error) {
        console.error('Eror from Register User', error);
    }
})


// API FOR GET ALL REGISTRATION DATA
adminrouter.get(('/get-all-user'), tokenchecker, async (req, res) => {
    try {
        const user = await UserModel.find().select({ password: 0 });

        if (user) {
            return res.status(200).json({ User: user });
        }
    } catch (error) {
        console.error('error from get all user api from admin (backend)', error)
    }
})


// Update User from admin
adminrouter.put(('/update-user/:id'), tokenchecker, uploadProfile.single('profile'), async (req, res) => {
    try {
        // const id = req.params.id;
        const { fname, lname, phone, email, aadhar_number, role } = req.body
        const userId = req.params.id

        const existUser = await userModel.findById(userId);

        const updateUser = await UserModel.findByIdAndUpdate(req.params.id, { fname, lname, phone, email, aadhar_number, role, profile: req.file ? req.file.path : existUser.profile }, { new: true });

        if (updateUser) {
            return res.status(200).json({ updatedUser: updateUser });
        }

    } catch (error) {
        console.error('error from update user from admin', error);
    }
})


// Delete user from admin
adminrouter.delete(('/delete-user/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const user = await UserModel.findByIdAndDelete(id);

            if (user) {
                return res.status(200).json({ msg: "User Deleted Successfully" });
            }
        }
    } catch (error) {
        console.error('Error from delete user account', error);
    }
})


// get user by id
adminrouter.get(('/get-user-details/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const profile = await UserModel.findById(id);

            if (profile) {
                return res.status(200).json({ Profile: profile });
            }
        }
    } catch (error) {
        console.error('error from get user by id admin api', error);
    }
})


// See all Contact Details from admin
adminrouter.get(('/get-all-contact'), tokenchecker, async (req, res) => {
    try {
        const contactData = await ContactModel.find();

        if (contactData) {
            return res.status(200).json({ Contact: contactData });
        }
    } catch (error) {
        console.error('error from get all contact details', error);
    }
})


// Update Contact from admin
adminrouter.put(('/update-user-contact/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const Contact = await ContactModel.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({ msg: "Contact Updated Successfully" });
        }
    } catch (error) {
        console.error('Error from update user account', error);
    }
})


// Delete Contact from admin
adminrouter.delete(('/delete-user-contact/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const Contact = await ContactModel.findByIdAndDelete(id);

            if (Contact) {
                return res.status(200).json({ msg: "Contact Deleted Successfully" });
            }
        }
    } catch (error) {
        console.error('error from delete user contact from admin', error)
    }
})

// get contact by id
adminrouter.get(('/get-contact-id/:id'), async (req, res) => {
    try {
        const id = req.params.id

        if (id) {
            const contactData = await ContactModel.findById(id);

            if (contactData) {
                return res.status(200).json({ contact: contactData })
            }
        }

    } catch (error) {
        console.error('error from get contact data by id', error);
    }
})


// Get all enquiry data from admin
adminrouter.get(('/get-enquiry'), tokenchecker, async (req, res) => {
    try {
        const EnquiryData = await EnquiryModel.find();

        if (EnquiryData) {
            return res.status(200).json({ enquiryData: EnquiryData });
        }
    } catch (error) {
        console.error('Error from get enquiry from admin', error);
    }
})



// Update enquiry data from admin
adminrouter.put(('/update-enquiry/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const EnquiryData = await EnquiryModel.findByIdAndUpdate(id, req.body, { new: true });

            if (EnquiryData) {
                return res.status(200).json({ enquiry: EnquiryData });
            }
        }
    } catch (error) {
        console.error('update enquiry from admin', error)
    }
})



// Delete enquiry from admin
adminrouter.delete(('/delete-enquiry/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const deleteEnquiry = await EnquiryModel.findByIdAndDelete(id);

            if (deleteEnquiry) {
                return res.status(200).json({ msg: "Enquiry Data Deleted Successfully" });
            }
        }
    } catch (error) {
        console.error('error from delete enquiry admin', error)
    }
})


// get enquiry by id
adminrouter.get(('/get-enquiry-id/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const getEnquiry = await EnquiryModel.findById(id);

            if (getEnquiry) {
                return res.status(200).json({ enq: getEnquiry });
            }
        }
    } catch (error) {
        console.error('error from get enquiry by id', error);
    }
})


// get all bookings room
adminrouter.get(('/get-bookings'), tokenchecker, async (req, res) => {
    try {
        const bookingRooms = await roomBookingModel.find();

        if (bookingRooms) {
            return res.status(200).json({ bookings: bookingRooms });
        }
    } catch (error) {
        console.error('error from get all booking rooms', error);
    }
})


// Update Bookings
adminrouter.put(('/update-booking/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id

        if (id) {
            const updatedHotel = await roomBookingModel.findByIdAndUpdate(id);

            if (updatedHotel) {
                return res.status(200).json({ updated_hotel: updatedHotel });
            }
        }
    } catch (error) {
        console.error('error from update booking', error);
    }
})


// Delete Booking
adminrouter.delete(('/delete-booking/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const deleteBooking = await roomBookingModel.findByIdAndDelete(id);

            if (deleteBooking) {
                return res.status(200).json('Deleted Successfully')
            }
        }
    } catch (error) {
        console.error('error from delete booking', error);
    }
})










// 404 Error, Page Not found for Admn route
adminrouter.get(('*'), async (req, res) => {
    res.status(404).send('Page Not Found');
})








module.exports = adminrouter;