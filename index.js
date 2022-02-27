const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require("./routes/userRoutes");
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
  return res.status(200).json({id : res.locals.user._id})
});

app.get('/', (req, res) => {
    res.send('hello world')
});


//Routes
app.use('/user', userRoutes)

//Serveur port listening
app.listen(3000, () => console.log("serveur running on port 3000"));