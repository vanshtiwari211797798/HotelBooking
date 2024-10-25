const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
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
    room_booking_status:{
        type:String,
        default:'available'
    }
});


const roomModel = new mongoose.model('rooms', roomSchema);
module.exports = roomModel;