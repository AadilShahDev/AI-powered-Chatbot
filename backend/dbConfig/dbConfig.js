// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // URL-encoded password: @ becomes %40
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://alirazamemon_db_user:bsaiF22%40IBA@aichatbot.6fwzef7.mongodb.net/?retryWrites=true&w=majority&appName=AIChatbot";
    
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;




// Username:alirazamemon_db_user
// Pass:bsaiF22@IBA