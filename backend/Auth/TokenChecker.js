const jwt = require('jsonwebtoken');
const Secret_Key = 'se#@7554cdfcfd%8*@#!';




// Checkng Token
const tokenchecker = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if(token){
            const jwttoken = token.replace('Bearer', "").trim();
            const verifytoken = jwt.verify(jwttoken, Secret_Key);

            if(verifytoken){
                next();
            }

        }else{
            res.status(400).send('token not provided')
        }
    } catch (error) {
        console.error('error mideleware', error);
    }
}


module.exports = tokenchecker;