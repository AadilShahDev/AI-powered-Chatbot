const express = require('express')
const cors = require('cors')
const Conversation = require('./dbConnection')


app = express()
app.use(express.json())
app.use(cors())

app.get('/',async(req,res)=>{
    const lastConversation = await Conversation.findOne().sort({ createdAt: -1 });
    res.send(lastConversation)
})

app.post('/data',async(req,res)=>{
    try{
        let conversation = await Conversation.findOne().sort({ createdAt: -1 });

        if (conversation) {
            // update the existing conversation
            conversation.messages.push(...req.body.messages); // append new messages
            const updatedConversation = await conversation.save();
            res.send(updatedConversation);
          } else {
            const result = new Conversation(req.body)
            const resu = await result.save()
            res.send(resu)
          }

    }catch (err) {
        console.error(err);
        res.status(500).send('Error saving conversation');
      }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));