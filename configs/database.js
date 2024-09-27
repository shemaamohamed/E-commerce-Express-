const mongoose = require("mongoose");

function connectDB() {
  const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/'; 

  mongoose.connect(MONGO_URL);

  mongoose.connection
    .once('open', () => console.log("Connected to MongoDB"))
    .on('error', (error) => console.error("Connection error:", error)); // Log error for debugging
}

module.exports = connectDB;
