
const userController = require('../controllers/userController')
const express = require('express');
const { checkUser } = require('../middleware/auth');
const router = express.Router();


router.get('/allusers', userController.getAllUsers)
router.get('/singleUser/:id', userController.getSingleUser)
router.get('/logout', userController.logout)
router.delete('/delete/:id', checkUser, userController.deleteUser)
router.put('/update/:id', checkUser, userController.updateUser)
router.get('/', userController.msg)
router.post('/register', userController.register)
router.post('/login', userController.login)

// Ban
router.get("/ban/:id", userController.banUser)
router.get("/unban/:id", userController.unbanUser)

module.exports = router