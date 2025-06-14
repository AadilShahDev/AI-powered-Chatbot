const express = require('express')
const Conversation = require('../Models/convoModel')
const router = require('./authRoutes')
const protect = require('../middleware/authMiddleware')

const routes=express.Router()

routes.post('/uploadConvo',protect,async(req,res)=>{
  const {userId,messages,chatId} = req.body
  let exsitingConvo;
  if(chatId){
    exsitingConvo = await Conversation.findOne({_id:chatId})
  }
 
  if(!exsitingConvo){
    const convo = new Conversation({
      userId:userId,
      title:messages[0].message,
      messages:messages
    })

    await convo.save()

    return res.send({message:'New Convo Created', convo:convo})
  }

  exsitingConvo.messages.push(...messages)
  const saved = await exsitingConvo.save()
  res.send({message:'convo saved',saved})
})

// router.get('/',async(req,res)=>{
//     const lastConversation = await Conversation.find()
//     res.send(lastConversation)
// })

// router.post('/oneConvo', async (req, res) => {
//   try {
//     console.log(req.body.chatId)
//     const chat = await Conversation.findOne({ chatID: req.body.chatId });

//     if (!chat) {
//       // Return empty conversation object if not found
//       return res.status(200).json({
//         messages: [],
//         title: '',
//         chatID: req.body.chatId,
//       });
//     }

//     res.status(200).json(chat);
//   } catch (err) {
//     console.error("Server error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.post('/data',async(req,res)=>{
//    try{
//         console.log("from server data post chatID : ",req.body.chatID)
//         let conversation = await Conversation.findOne({chatID:req.body.chatID})
//         console.log("from server data post result : ",conversation)

//         if (conversation) {
//             conversation.messages.push(...req.body.messages.slice(-2)); // append new messages
//             console.log("About to save conversation:", req.body);
//             const updatedConversation = await conversation.save();
//             res.send(updatedConversation);
//           } else {
//             const result = new Conversation(req.body)
//             console.log("About to save conversation:", req.body);
//             const resu = await result.save()
//             res.send(resu)
//           }
//     }catch (err) {
//         console.error(err);
//         res.status(500).send({error:'Error saving conversation'});
//       }
// })

module.exports = routes