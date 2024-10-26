const mongoose = require('mongoose');
// const URL = 'mongodb://localhost:27017/HOTELBOOKING';
const URL = 'mongodb+srv://tiwarivansh372:Tiwari211797798@cluster0.5g7jn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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