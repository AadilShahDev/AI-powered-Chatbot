const express = require('express')
const Conversation = require('./dbConnection')

app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Conversation data')
})

app.post('/data',async(req,res)=>{
    const result = new Conversation(req.body)
    const resu = await result.save()
    res.send(resu)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));