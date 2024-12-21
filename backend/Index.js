const express = require('express');
const path = require('path'); 
const app = express();
const ConnectDB = require('./DataBase/DataBase');
const router = require('./Router/Router');
const adminrouter = require('./Admin_api/AdminApi');
const cors = require('cors');


const Origin = {
    origin:['http://localhost:5173', 'https://hotelbooking-frontend-squq.onrender.com'],
    method:['GET','POST', 'PUT', 'DELETE'],
    Credential:true
}

// app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors(Origin));
app.use(express.json());
// Serve the static files from the React app


// // An api endpoint that returns a short list of items
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

app.use('/profiles', express.static('profiles'));

app.use('/rooms', express.static('rooms'))

app.use('/room_category', express.static('room_category'));




// For admin side api router
app.use('/admin/api', adminrouter);
// For Client side api router
app.use('/client', router);


// This project is running on the port number 3000, we can change or modify-
const PORT = 3000;


ConnectDB().then(() => {
    app.listen((PORT),() => {
        console.log(`App is running on port number  ${PORT}`);
    })
})
