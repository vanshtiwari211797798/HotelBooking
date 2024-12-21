const mongoose = require('mongoose');
// My local system DataBase Url MongoDB Server
// const URL = 'mongodb://localhost:27017/HOTELBOOKING';

// MongoDb Cloud Atlas Url MongoDb Atlab cloud 
const URL = 'mongodb+srv://tiwarivansh372:Tiwari211797798@cluster0.5g7jn.mongodb.net/HotelBooking?retryWrites=true&w=majority&appName=Cluster0';


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