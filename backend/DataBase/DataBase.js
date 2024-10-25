const mongoose = require('mongoose');
const URL = 'mongodb://localhost:27017/HOTELBOOKING';

const ConnectDB = async () => {
    try {
      await mongoose.connect(URL);
      console.log('DataBase connected successfully')  
    } catch (error) {
       console.error('Unable to Connect DataBase');
       process.exit(0); 
    }
}

module.exports = ConnectDB;