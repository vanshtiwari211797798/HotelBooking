const express = require('express');
const router = express.Router();
const userModel = require('../UserModel/UserModel');
const bcrypt = require('bcryptjs');
const Secret_Key = 'se#@7554cdfcfd%8*@#!';
const jwt = require('jsonwebtoken');
const authProfileChecker = require('../Auth/profileauth');
const RoomsModel = require('../RoomsModel/RoomsHotelsModel');
const ContactModel = require('../ContactModel/ContactModel');
const EnquiryModel = require('../EnquiryModel/EnquiryModel');
const roomBookingModel = require('../RoomBookingModel/RoomBooking_Model');
const CategoryModel = require('../RommCategoryModel/RoomCategory');
const tokenchecker = require('../Auth/TokenChecker')
const profileauth = require('../Auth/profileauth')
const multer = require('multer');
const roomModel = require('../RoomsModel/RoomsHotelsModel');




// for uploading profile image
const MyProfile = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './profiles')
    },
    filename: function (req, file, cb) {
        // return cb(null, `${Date.now()}-${file.originalname}`);
        return cb(null, `${Date.now()} - ${file.originalname}`)
    }
})

const upload = multer({ storage: MyProfile })



// // for booking room image
// const roomBooking = multer.diskStorage({
//     destination: function (req, file, cb) {
//         return cb(null, './booking_rooms')
//     },
//     filename: function (req, file, cb) {
//         // return cb(null, `${Date.now()}-${file.originalname}`);
//         return cb(null, `${Date.now()} - ${file.originalname}`)
//     }
// })

// const bookRoom = multer({ storage: roomBooking })


// [CLIENT SIDE API]

// user end point url - http://localhost:3000/client/get-types-room/:room_category_name

//REGISTER API FOR REGISTER A NEW USER
router.post(('/register'), upload.single('profile'), async (req, res) => {
    try {
        const { fname, lname, phone, email, aadhar_number, password } = req.body;
        const profile = req.file.path

        if (!fname || !phone || !email || !aadhar_number || !profile || !password) {

            return res.status(400).json({ msg: "All field is required" });

        }

        const userExist = await userModel.findOne({ email: email });

        if (userExist) {

            return res.status(409).json({ message: 'User allready Exist' });

        }

        // Create a sortRound for hashing the password using bcrypt password pakage manager
        const SartRound = 10;
        const hashPassword = await bcrypt.hash(password, SartRound);

        // Creating a new User
        const User = new userModel({ fname, lname, phone, email, aadhar_number, profile, password: hashPassword });
        await User.save();

        return res.status(201).json({ message: "User Regster Successfully" });


    } catch (error) {
        console.error('Eror from Register User', error);
    }
})


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const UserExist = await userModel.findOne({ email: email });

        if (!UserExist) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const ComparePassword = await bcrypt.compare(password, UserExist.password);

        if (!ComparePassword) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        // Generating a token for authenticating the user
        const token = jwt.sign({ email }, Secret_Key);
        UserExist.token = token;

        return res.status(200).json({ message: "User login successfully", token: token });

    } catch (error) {
        console.error('Error from Login User', error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});




//USER PROFILE API FOR SHOWING CURRENT LOGIN USER PROFILE
router.get(('/user-profile'), authProfileChecker, async (req, res) => {
    try {
        const Profile = req.profile;
        return res.status(200).json({ profile: Profile });
    } catch (error) {
        console.error('Unable to fetch user profile', error);
    }
})


//DELETE USER ACCOUNT FROM WEBSITE (CLIENT)
router.delete(('/delete-user-account/:id'), async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            await userModel.findByIdAndDelete(id);
            return res.status(200).json({ msg: "Account Deleted Successfully" });
        }
    } catch (error) {
        console.error('Error from delete user account', error);
    }
})



//UPDATE USER ACCOUNT FROM PROFILE PAGE, USER CAN UPDATE THEIR INFORMATION LIKE NAME, PHONE ETC.
router.put(('/update-user-account/:id'), async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const response = await userModel.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({ msg: "Account Updated Successfully", Account: response });
        }
    } catch (error) {
        console.error('Error from update user account', error);
    }
})

// get user details by id
router.get(('/get-user-details/:id'), async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const profile = await userModel.findById(id);

            if (profile) {
                return res.status(200).json({ Profile: profile });
            }
        }
    } catch (error) {
        console.error('error from ')
    }
})

// API FOR CONTACT US PAGE
router.post(('/contact-us'), async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;

        if (!name || !phone || !email || !message) {
            return res.status(400).json({ msg: "All field is require" });
        }

        const contact = new ContactModel({ name, phone, email, message });
        await contact.save();
        return res.status(201).json({ msg: "Contact Submtted Successfully" });

    } catch (error) {
        console.error('error from contact us api', error);
    }
})


// API FOR ENQUIRY PAGE
router.post(('/enquiry'), async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;

        if (!name || !phone || !email || !message) {
            return res.status(400).json({ msg: "All field is required" });
        }

        const Enquiry = new EnquiryModel({ name, phone, email, message });
        await Enquiry.save();
        return res.status(201).json({ msg: "Enquiry Created Successfully" });

    } catch (error) {
        console.error('error form enquiry api', error)
    }
})

// get all category
router.get(('/get-all-category'), async (req, res) => {
    try {
        const allCategory = await CategoryModel.find();

        if(allCategory){
            return res.status(200).json({category:allCategory});
        }
    } catch (error) {
        console.error('error from get category client side', error);
    }
})

// show all rooms by category name - dilux / superdilux / luxery etc...
router.get(('/get-types-room/:room_category_name'), async (req, res) => {
    try {
        const {room_category_name} = req.params;

        if(!room_category_name){
            return res.status(400).json({msg:"Category room not received from parameter"});
        }
        
        const category = await roomModel.find({
            room_category:room_category_name});

        if(category){
            return res.status(200).json({category:category});
        }
    } catch (error) {
        console.error('error from get category room', error);
    }
})

// GET ALL ROOM API
router.get(('/get-rooms'), async (req, res) => {
    try {
        const room = await RoomsModel.find();
        if (room) {
            return res.status(200).json({ Room: room });
        }
    } catch (error) {
        console.error('error from get rooms', error);

    }
})


// get room by id
router.get(('/get-room/:id'), async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const room = await RoomsModel.findById(id) ||  await roomBookingModel.findById(id)

            if (room) {
                return res.status(200).json({ Room: room })
            }
        }
    } catch (error) {
        console.error('error from get room by id', error);
    }
})


// Room booking api for user

router.post(('/book-room'), tokenchecker, async (req, res) => {
    try {
        const { room_number, room_category, room_image, room_description, room_price, total_beds, capacity, fname, lname, email, phone, aadhar_number, number_of_rooms, booking_date } = req.body;
        // const room_image = req.file.path;

        if (!room_number || !room_category || !room_image || !room_description || !room_price || !total_beds || !capacity || !fname || !email || !phone || !aadhar_number || !number_of_rooms || !booking_date) {

            return res.status(400).json({ msg: "All fields is required" })

        }

        const Room = await RoomsModel.findOne({ room_number: room_number });

        if (Room) {

            const booking_Status = Room.room_booking_status;

            if (booking_Status === 'available') {

                const Booking = new roomBookingModel({ room_number, room_category,room_image, room_description, room_price, total_beds, capacity, fname, lname, email, phone, aadhar_number, number_of_rooms, booking_date });
                await Booking.save();
                Room.room_booking_status = 'unavailable'
                await Room.save();
                return res.status(201).json({ msg: "Room Booked Successfully" });

            } else {
                return res.status(404).json({ msg: "Room is not available" })
            }

        }

    } catch (error) {
        console.error('Error from room booking user', error)
    }
})


// api for get the bookings of user
router.get(('/get-my-booking'),profileauth, async (req, res) => {
    try {
        const userEmail = req.profile.email;
        
        if(!userEmail){
            return res.status(400).json({msg:"email not get"})
        }
        const myBooking = await roomBookingModel.find({email:userEmail});
        return res.status(200).json({booking:myBooking});
    } catch (error) {
        console.error('error from get user booking', error);
    }
})


// cancel booking by user
router.put(('/cancel-booking/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id;
        const booking = await roomBookingModel.findById(id);
        const room = await roomModel.findOne({room_number:booking.room_number});
        if(!booking){
           return res.status(400).json({msg:"Room not found"});
        }
        booking.booking_status = "Canceled";
        room.room_booking_status = 'available';
        await booking.save();
        await room.save();
        return res.status(200).json({msg:"Room canceled successfully"});
       

    } catch (error) {
        console.error('error from delete booking', error);
    }
})


// get room by id of cart
router.get(('/get-room/:id'), async (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            const room = await RoomsModel.findById(id) || await roomBookingModel.findById(id)

            if (room) {
                return res.status(200).json({ Room: room })
            }
        }
    } catch (error) {
        console.error('error from get room by id', error);
    }
})



// update the quantity of mybooking room
router.put(('/update-view-room/:id'), tokenchecker, async (req, res) => {
    try {
        const {id} = req.params;

        if(!id){
            return res.status(200).json({msg:"id not received from client side"})
        }

        const updateViewRoom = await roomBookingModel.findByIdAndUpdate(id, req.body, {new:true});
        if(updateViewRoom){
            return res.status(200).json({msg:"Updated Successfully"}) 
        }

    } catch (error) {
        console.error('error from update view room', error);
    }
})



router.get(('/origional-room-price/:roomno'),async (req, res) => {
    try {
        const {roomno} = req.params;

        if(!roomno){
            return res.status(400).json({msg:"Room number not received "});
            console.log("room n no tr e")
        }
        const roomPrice = await roomModel.findOne({room_number :roomno});
        if(roomPrice){
            return res.status(200).json({price:roomPrice.room_price})
        }
    } catch (error) {
        console.error('error from get origional room price', error);
    }
})
module.exports = router;