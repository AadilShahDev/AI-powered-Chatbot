const express = require('express')
const Conversation = require('../Models/convoModel')
const protect = require('../middleware/authMiddleware')

const routes=express.Router()

routes.post('/uploadConvo',protect,async(req,res)=>{
  try {
    const {userId,messages,chatId} = req.body
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({message: 'Messages are required'});
    }
    
    let existingConvo;
    if(chatId){
      existingConvo = await Conversation.findOne({_id:chatId})
    }
   
    if(!existingConvo){
      const convo = new Conversation({
        userId:userId,
        title:messages[0].message || 'New Conversation',
        messages:messages
      })

      const savedConvo = await convo.save()
      return res.status(201).json({message:'New Convo Created', convo:savedConvo})
    }

    existingConvo.messages.push(...messages)
    const saved = await existingConvo.save()
    res.status(200).json({message:'convo saved',convo:saved})
  } catch (error) {
    console.error('Error uploading conversation:', error);
    res.status(500).json({message: 'Internal server error'});
  }
})

routes.get('/getConvo/:userId/:chatId',protect,async(req,res)=>{
  const {chatId,userId} = req.params
  try {
    const existingConvo = await Conversation.findOne({userId:userId,_id:chatId}).select('messages')
    if(!existingConvo){
      return res.status(404).json({message:"Conversation not found, may be moved or deleted."})
    }
    res.status(200).json({
      message: "Here is your convo",
      messages: existingConvo.messages
    })
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({message: 'Internal server error'});
  }
})

routes.get('/allConvos/:userId',protect,async(req,res)=>{
  const userId = req.params.userId
  const convos = await Conversation.find({userId:userId}).select('_id title')
  res.send(convos)
})

module.exports = routes