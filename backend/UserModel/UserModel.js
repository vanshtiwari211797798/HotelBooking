const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    aadhar_number:{
        type:Number,
        require:true
    },
    profile:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:Number,
        require:true,
        default:0
    }
})

const userModel = new mongoose.model('users', userSchema);
module.exports = userModel;