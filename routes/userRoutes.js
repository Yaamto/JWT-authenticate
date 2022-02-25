
const userController = require('../controllers/userController')
const express = require('express');
const { checkUser } = require('../middleware/auth');
const router = express.Router();


router.get('/allusers', userController.getAllUsers)
router.get('/logout', userController.logout)
router.delete('/delete/:id', checkUser, userController.deleteUser)
router.put('/update/:id', userController.updateUser)
router.get('/', userController.msg)
router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router