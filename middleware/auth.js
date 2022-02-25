const jwt = require('jsonwebtoken')
const User = require('../models/userModel').User

const checkUser = async(req, res, next) => {



  
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
          
          if (err) {
            res.locals.user = null;
            res.cookie("jwt", "", { maxAge: 1 });
            return res.send('token not available or expired')
          } else {
              
            let user = await User.findById(decodedToken.id);
            res.locals.user = user;
            if(res.locals.user){
            
            next();
            }else {
              return res.send("u are not connected")
              
            }
          }
        });
      } else {
        res.locals.user = null;
        
       return res.status(400).json({msg: "pas de token"})
        
      }
    }


const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt
    

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
          if (err) {
            console.log(err);
            res.send(400).json('no token')
          } else {
            console.log(decodedToken.id);
            next();
          }
        });
      } else {
        console.log('No token');
      }
}


module.exports = {
    checkUser,
    requireAuth
}