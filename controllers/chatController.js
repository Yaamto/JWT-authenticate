const Chat = require("../models/chatModel").Chat;
const User = require("../models/userModel").User


const accessChat = async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
    const UserToSend = await User.findById(userId)
    
  
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: res.locals.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "userName email",
    });
  
    if (isChat.length > 0) {
      res.send({chat: isChat[0], isExist: "yes"});
    } else {
      var chatData = {
        chatName: UserToSend.userName,
        isGroupChat: false,
        users: [res.locals.user._id, userId],
      };
  
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  };
  const fetchChats = async (req, res) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: res.locals.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };


  const deleteChat = async(req, res) => {

    
    try {
     
      const chat = await Chat.findByIdAndDelete({_id :req.params.id})

      if (chat) {

          res.status(200).json({ message: "Successfully deleted. " });

          
      }
      else {
          res.status(500).json({ msg: "no user found" })
      }



  } catch (err) {
      res.status(401).json({ essai: "errrrrrrrr" })
  }
  }

  module.exports = {
      accessChat,
      fetchChats,
      deleteChat
  }