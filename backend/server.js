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
    const result = new Conversation(req.body)
    const resu = await result.save()
    res.send(resu)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));