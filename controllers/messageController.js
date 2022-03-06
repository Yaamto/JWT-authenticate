const Chat = require("../models/chatModel").Chat;
const User = require("../models/userModel").User
const Message = require("../models/messageModel").Message;


const sendMessage = async(req, res) => {
    const {content, chatId} = req.body

    if(!content || !chatId) {
        console.log("invalid data passed into request")
        return res.status(400)
    }

    var newMessage =  {
        sender: res.locals.user._id,
        content: content,
        chat: chatId
    }

    try {

        var message = await Message.create(newMessage) 

        message = await message.populate("sender", "userName email");
        message = await message.populate("chat");
        message = await User.populate(message,  {
            path:'chat.users',
            select : "userName email",
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        })

        res.json(message)
    } catch(error) {
        res.status(400)
        throw new Error(error.message)
    }

  
}

const allMessages = async(req,res) => {

 try {


    const messages = await Message.find({chat: req.params.chatId})
    .populate("sender")
    .populate("chat")
    
    res.json(messages)


 }catch(error){
    res.status(400)
    throw new Error(error.message)
 }

}


module.exports ={
    sendMessage,
    allMessages
}