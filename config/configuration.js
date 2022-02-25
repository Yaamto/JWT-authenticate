const mongoose = require("mongoose");


mongoose
  .connect(
    "mongodb+srv://Bilal:bilal@cluster0.ivelk.mongodb.net/test")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));