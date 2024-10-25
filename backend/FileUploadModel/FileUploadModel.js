const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    imageUrl:{
        type:String,
        require:true
    }
})

const FileModel = new mongoose.model('files', FileSchema);

module.exports = FileModel;