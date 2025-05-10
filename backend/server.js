const express = require('express')
const cors = require('cors')
const Conversation = require('./dbConnection')


app = express()
app.use(express.json())
app.use(cors())

app.get('/',async(req,res)=>{
    const lastConversation = await Conversation.find()
    res.send(lastConversation)
})

app.post('/oneConvo', async (req, res) => {
  try {
    console.log(req.body.chatId)
    const chat = await Conversation.findOne({ chatID: req.body.chatId });

    if (!chat) {
      // Return empty conversation object if not found
      return res.status(200).json({
        messages: [],
        title: '',
        chatID: req.body.chatId,
      });
    }

    res.status(200).json(chat);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/data',async(req,res)=>{
   try{
        console.log("from server data post chatID : ",req.body.chatID)
        let conversation = await Conversation.findOne({chatID:req.body.chatID})
        console.log("from server data post result : ",conversation)

        if (conversation) {
            conversation.messages.push(...req.body.messages.slice(-2)); // append new messages
            console.log("About to save conversation:", req.body);
            const updatedConversation = await conversation.save();
            res.send(updatedConversation);
          } else {
            const result = new Conversation(req.body)
            console.log("About to save conversation:", req.body);
            const resu = await result.save()
            res.send(resu)
          }
    }catch (err) {
        console.error(err);
        res.status(500).send({error:'Error saving conversation'});
      }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));