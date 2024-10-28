const jwt = require('jsonwebtoken');
const Secret_Key = 'se#@7554cdfcfd%8*@#!';
const userModel = require('../UserModel/UserModel');



// Middleware for showing current login user profile
const authProfileChecker = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            res.status(401).send('Unauthorized access, token not be provided');
        } else {
            const jwt_token = token.replace('Bearer', "").trim();
            const jwt_verify = jwt.verify(jwt_token, Secret_Key);
            const profile = await userModel.findOne({email:jwt_verify.email}).select({password:0});
          
            req.profile = profile
            next();
        }
    } catch (error) {
        console.error('error from fetch user profile',error);
    }
}


module.exports = authProfileChecker;
