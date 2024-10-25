const mongoose = require('mongoose');


const SpecialOfferroomSchema = new mongoose.Schema({
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
    room_totaloffer_percentage:{
        type:String,
        require:true
    },
    room_old_price:{
        type:Number,
        require:true
    },
    room_main_price:{
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


const SpecialOfferroomModel = new mongoose.model('specialRooms', SpecialOfferroomSchema);
module.exports = SpecialOfferroomModel;