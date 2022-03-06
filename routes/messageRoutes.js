const express = require('express');
const { checkUser } = require('../middleware/auth');
const router = express.Router();
const messageController = require("../controllers/messageController")


router.post("/", checkUser, messageController.sendMessage)
router.get("/:chatId", checkUser, messageController.allMessages)

module.exports = router