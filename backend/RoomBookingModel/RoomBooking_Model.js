const mongoose = require('mongoose');

const roomBookingSchema = new mongoose.Schema({

    room_number:{
        type:Number,
        require:true
    },
    room_category:{
        type:String,
        require:true
    },
    room_image:{
        type:String,
        require:true
    },
    room_description:{
        type:String,
        require:true
    },
    room_price:{
        type:Number,
        require:true
    },
    total_beds:{
        type:Number,
        require:true
    },
    capacity:{
        type:String,
        require:true
    },
    fname:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }, 
    phone:{
        type:Number,
        require:true
    },
    aadhar_number:{
        type:Number,
        require:true
    },
    check_in_date:{
        type:String,
        default:"NA"
    },
    check_out_date:{
        type:String,
        default:"NA"
    },
    number_of_rooms:{
        type:Number,
        require:true
    },
    booking_date:{
        type:String,
        require:true
    },
    booking_check_in_date:{
        type:Date,
        require:true
    },
    booking_check_out_date:{
        type:Date,
        require:true
    },
    booking_status:{
        type:String,
        default:'Pending'
    }

})


const  roomBookingModel = new mongoose.model("bookings", roomBookingSchema);

module.exports = roomBookingModel;