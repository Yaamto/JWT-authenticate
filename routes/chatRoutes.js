const express = require('express');
const { checkUser } = require('../middleware/auth');
const router = express.Router();

const chatController = require("../controllers/chatController")


router.post("/", checkUser, chatController.accessChat)
router.get("/", checkUser, chatController.fetchChats)
router.delete("/delete/:id", checkUser, chatController.deleteChat)


module.exports = router