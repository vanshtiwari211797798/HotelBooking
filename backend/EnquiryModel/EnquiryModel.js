const mongoose = require('mongoose');

const Enquiry_Schema = new mongoose.Schema({
    name:{
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
    message:{
        type:String,
        require:true
    }
})

const EnquiryModel = new mongoose.model('enquiry', Enquiry_Schema);

module.exports = EnquiryModel;