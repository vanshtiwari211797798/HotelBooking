const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    room_category_image:{
        type:String,
        require:true
    },
    room_category_name:{
        type:String,
        require:true
    },
    room_category_price:{
        type:String,
        require:true
    }
})

const CategoryModel = new mongoose.model('room_category', CategorySchema);
module.exports = CategoryModel;