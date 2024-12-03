const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
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
const subsCribe_model = require('../Subscribe_model/SubsCribe')
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

// uploading profile image during signup a user
const upload = multer({ storage: MyProfile })



// [CLIENT SIDE API]

// user end point url - http://localhost:3000/client/forget-password

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

        if (UserExist.role === 1) {
            return res.status(201).json({ message: "Admin login successfully", token: token });
        } else {
            return res.status(200).json({ message: "User login successfully", token: token });
        }


    } catch (error) {
        console.error('Error from Login User', error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});


// forget password api
router.post(('/forget-password'), async (req, res) => {
    try {
        const {email} = req.body;

        if(!email){
            return res.status(400).json({msg:"Email not received, email is required"})
        }

        const user = await userModel.findOne({email:email});

        if(!user){
            return res.status(409).json({msg:"User not find"})
        }

        const token = jwt.sign({email:email}, Secret_Key);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'vanshtiwari9091@gmail.com',
              pass: 'Tiwari@21179779821'
            }
          });
          
          const mailOptions = {
            from: 'vanshtiwari9091@gmail.com',
            to: `${email}`,
            subject: 'Forget password',
            text: `http://localhost:5173/forget-password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.status(200).json({msg:"forget password successfully"})
            }
          });

    } catch (error) {
        console.error('error from forget password', error);
        
    }
})


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
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ msg: "All field is require" });
        }

        const contact = new ContactModel({ name, email, message });
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

        if (allCategory) {
            return res.status(200).json({ category: allCategory });
        }
    } catch (error) {
        console.error('error from get category client side', error);
    }
})


router.get('/get-available-rooms', async (req, res) => {
    try {
        const { booking_check_in_date, booking_check_out_date } = req.query;

        // Date validation
        if (!booking_check_in_date || !booking_check_out_date) {
            return res.status(400).json({ msg: "Check-in and check-out dates not received" });
        }


        const checkIn = new Date(booking_check_in_date);
        const checkOut = new Date(booking_check_out_date);


        checkIn.setHours(0, 0, 0, 0);
        checkOut.setHours(23, 59, 59, 999);


        const bookedRooms = await roomBookingModel.find({
            $or: [
                {
                    booking_check_in_date: { $lt: checkOut },
                    booking_check_out_date: { $gt: checkIn }
                }
            ]
        }).distinct('room_number');


        const availableRooms = await roomModel.find({
            room_number: { $nin: bookedRooms }
        });

        // Return available rooms
        res.status(200).json({ available_rooms: availableRooms });
    } catch (error) {
        console.error('Error finding available rooms', error);
        res.status(500).json({ msg: 'Server error' });
    }
});





// show all rooms by category name - dilux / superdilux / luxery etc...
router.get(('/get-types-room/:room_category_name'), async (req, res) => {
    try {
        const { room_category_name } = req.params;

        if (!room_category_name) {
            return res.status(400).json({ msg: "Category room not received from parameter" });
        }

        const category = await roomModel.find({
            room_category: room_category_name
        });

        if (category) {
            return res.status(200).json({ category: category });
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
            const room = await RoomsModel.findById(id) || await roomBookingModel.findById(id)

            if (room) {
                return res.status(200).json({ Room: room })
            }
        }
    } catch (error) {
        console.error('error from get room by id', error);
    }
})


// Room booking api for user
router.post('/book-room', tokenchecker, async (req, res) => {
    try {
        const {
            room_number,
            room_category,
            room_image,
            room_description,
            room_price,
            total_beds,
            capacity,
            fname,
            lname,
            email,
            phone,
            aadhar_number,
            number_of_rooms,
            booking_date,
            booking_check_in_date,
            booking_check_out_date
        } = req.body;

        // Validate all required fields
        if (!room_number || !room_category || !room_image || !room_description || !room_price || !total_beds || !capacity || !fname || !email || !phone || !aadhar_number || !number_of_rooms || !booking_date || !booking_check_in_date || !booking_check_out_date) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Convert check-in and check-out dates to Date objects for comparison
        const checkInDate = new Date(booking_check_in_date);
        const checkOutDate = new Date(booking_check_out_date);


        checkInDate.setHours(0, 0, 0, 0);
        checkOutDate.setHours(23, 59, 59, 999);

        // Check if the room is already booked within the given date range
        const isRoomUnavailable = await roomBookingModel.findOne({
            room_number: room_number,
            $or: [
                {
                    booking_check_in_date: { $lt: checkOutDate },
                    booking_check_out_date: { $gt: checkInDate }
                }
            ]
        });

        if (isRoomUnavailable) {
            return res.status(401).json({ msg: "Room is unavailable on this date" });
        }

        // Find the room by its number to check its current booking status
        const room = await roomModel.findOne({ room_number: room_number });

        // Check if the room exists and its status is 'available'
        if (room) {
            if (room.room_booking_status === 'available') {
                // Proceed to book the room if it's available
                const Booking = new roomBookingModel({
                    room_number,
                    room_category,
                    room_image,
                    room_description,
                    room_price,
                    total_beds,
                    capacity,
                    fname,
                    lname,
                    email,
                    phone,
                    aadhar_number,
                    number_of_rooms,
                    booking_date,
                    booking_check_in_date: checkInDate,
                    booking_check_out_date: checkOutDate
                });

                // Save the booking to the database
                await Booking.save();

                // Update the room's booking status to 'booked' after successful booking
                await roomModel.updateOne({ room_number }, { $set: { room_booking_status: 'booked' } });

                return res.status(201).json({ msg: "Room Booked Successfully" });
            } else {
                return res.status(404).json({ msg: "Room is not available" });
            }
        } else {
            return res.status(404).json({ msg: "Room not found" });
        }

    } catch (error) {
        console.error('Error from room booking user', error);
        res.status(500).json({ msg: "Internal server error" });
    }
});







// api for get the bookings of user
router.get(('/get-my-booking'), profileauth, async (req, res) => {
    try {
        const userEmail = req.profile.email;

        if (!userEmail) {
            return res.status(400).json({ msg: "email not get" })
        }
        const myBooking = await roomBookingModel.find({ email: userEmail });
        return res.status(200).json({ booking: myBooking });
    } catch (error) {
        console.error('error from get user booking', error);
    }
})


// cancel booking by user
router.put(('/cancel-booking/:id'), tokenchecker, async (req, res) => {
    try {
        const id = req.params.id;
        const booking = await roomBookingModel.findById(id);
        const room = await roomModel.findOne({ room_number: booking.room_number });
        if (!booking) {
            return res.status(400).json({ msg: "Room not found" });
        }
        booking.booking_status = "Canceled";
        room.room_booking_status = 'available';
        await booking.save();
        await room.save();
        return res.status(200).json({ msg: "Room canceled successfully" });


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
        const { id } = req.params;

        if (!id) {
            return res.status(200).json({ msg: "id not received from client side" })
        }

        const updateViewRoom = await roomBookingModel.findByIdAndUpdate(id, req.body, { new: true });
        if (updateViewRoom) {
            return res.status(200).json({ msg: "Updated Successfully" })
        }

    } catch (error) {
        console.error('error from update view room', error);
    }
})



router.get(('/origional-room-price/:roomno'), async (req, res) => {
    try {
        const { roomno } = req.params;

        if (!roomno) {
            return res.status(400).json({ msg: "Room number not received " });
        }
        const roomPrice = await roomModel.findOne({ room_number: roomno });
        if (roomPrice) {
            return res.status(200).json({ price: roomPrice.room_price })
        }
    } catch (error) {
        console.error('error from get origional room price', error);
    }
})


// api for subscribe website who wants to get new recentle

router.post(('/subscribe-now'),async (req, res) => {
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).json({msg:"email not received, email is required"});
        }

        // if email received from req.body
        const subs_Schema = new subsCribe_model({email});
        await subs_Schema.save();
        return res.status(201).json({msg:"Subscribe Successfully, thank you"});
    } catch (error) {
        console.error('error from subscribe model', error);
    }
})


module.exports = router;