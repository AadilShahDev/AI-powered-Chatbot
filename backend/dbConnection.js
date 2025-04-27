const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/Conversations")

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["user", "bot"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
}, { _id: false }); // don't create _id for each message

const conversationSchema = new mongoose.Schema({
  userId: {
    type: String, // or mongoose.Schema.Types.ObjectId if you have User model
    required: false, // optional if you allow anonymous chats
  },
  title: {
    type: String,
    required: false,
  },
  messages: [messageSchema],
}, { timestamps: true }); // automatically adds createdAt and updatedAt

const Conversation = mongoose.model("conversations", conversationSchema);

module.exports = Conversation;
