const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

const subscribeModel = mongoose.model('Subscribe', subscribeSchema);

module.exports = subscribeModel;
