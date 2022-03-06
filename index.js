const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes =require("./routes/messageRoutes")
const { checkUser, requireAuth } = require('./middleware/auth');

require('./config/configuration')
require('dotenv').config()
const cors = require('cors')


const app = express()


app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
  return res.status(200).json({user : res.locals.user})
});

app.get('/', (req, res) => {
    res.send('hello world')
});


//Routes
app.use('/user', userRoutes)
app.use('/chat', chatRoutes)
app.use('/message', messageRoutes)

//Serveur port listening
const server = app.listen(3000, () => console.log("serveur running on port 3000"));

const io = require("socket.io")(server, {
  pingTimeout: 90000,
  cors: {
    origin: "http://localhost:3001",
  },
})

io.on("connection", (socket) => {
console.log("connected to socket.io")


socket.on('setup', (userData) => {
  socket.join(userData)
  console.log(userData)
  socket.emit("connected")
})

socket.on("join chat", (room) => {
  socket.join(room)
  console.log("User joined Room : " + room)
})


socket.on("typing", (room) => socket.in(room).emit("typing"))
socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))



socket.on("new message", (newMessageRecieved) => {
  var chat = newMessageRecieved.chat;

  if(!chat.users) console.log("chat.users not defined")


  chat.users.forEach(user => {
    if(user._id == newMessageRecieved.sender._id) return

    socket.in(user._id).emit("message recieved", newMessageRecieved)
  })
})

})