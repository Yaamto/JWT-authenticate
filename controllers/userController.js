const fs = require('fs')
const moment = require('moment')
const logger = require('../config/log')
const jwt = require("jsonwebtoken")
const User = require("../models/userModel").User;
const ObjectID = require("mongoose").Types.ObjectId;


const msg = (req,res) => {
    res.send('voici un recu')
}

const register = (req, res) => {
    
    User.findOne({email: req.body.email}).then((user) => {
        
        if(user){
            const error = "A user is already register with this email"
            return res.status(200).send({error})
        }else {
            const newUser = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                
            })
            newUser.save()

            return res.status(200).json({msg: newUser})
        }
    })

}

const getAllUsers = async(req, res) => {
  

try {
 const users = await User.find().select("-password")
 
 if(users){
     res.status(200).json({users : users})
    

 }else {
    res.status(401).json({ error: "Users not found" });
    
  }
} catch(err){
    res.status(500).json(err);
   
}
}

const getSingleUser = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    try{
        const user = await User.findById(req.params.id)
        if (user) {
           
            
            if(user._id.toString() === res.locals.user._id.toString()){
                
                
                res.status(200).json({ user : user});

               
            }else {
                logger.visitedUser(user, res.locals.user)
                res.status(200).json({ user : user});
                
            }
        } else {
            res.status(500).json({ msg: "user not found" })
        }
    } catch (err) {
        res.status(401).json({ error: err})
    }
    
}


//Delete User 
const deleteUser = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    
        try {
            const user = await User.findByIdAndDelete({ _id: req.params.id })

            if (user) {

                res.status(200).json({ message: "Successfully deleted. " });

                logger.deleteUserLog(user, res.locals.user)
            }
            else {
                res.status(500).json({ msg: "no user found" })
            }



        } catch (err) {
            res.status(401).json({ essai: "errrrrrrrr" })
        }
    
}

const updateUser = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

    const user = {
        userName : req.body.userName,           
        email : req.body.email,
        
    }

    try {

        User.findOneAndUpdate(req.params.id, 
            {$set : user},
            {$new: true, upsert: true, setDefaultsOnInsert: true })
            .then((data) =>res.send(data))
            .catch((err)=> res.status(500).send(err))
    }catch(err){
        return res.status(500).json({ message: err });
    }
}
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
      
    expiresIn: maxAge
  })
  
};

const login = async(req,res) => {

    const { email, password } = req.body
    try {
        
        const user = await User.login(email, password);
        
        const token = createToken(user._id);
       
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        logger.userConnected(user)
        res.status(200).json({ user: user._id, token : token})

        
      }
      catch(err) {
        res.status(400).json({ error : "erreur" });
      }


}

const logout = async(req,res) => {

    console.log(res.locals.user.userName)
    logger.userDisconnected(res.locals.user)
    res.cookie('jwt', '', { maxAge: 1 });                         
    res.redirect('/');
}


module.exports = {

    msg,
    register,
    getAllUsers,
    deleteUser,
    updateUser,
    login,
    logout,
    getSingleUser 

    
}