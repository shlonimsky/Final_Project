import express from 'express';
import { getAllMyConversations, createNewConversation, getAllMessagesByConv, sendNewMessage } from '../controllers/Chat.js';
// import { VerifyToken } from '../middlewares/verifytoken.js';
const routerChat = express.Router();


routerChat.put('/conversations', getAllMyConversations)
routerChat.post('/conversations', createNewConversation)

routerChat.put('/messages', getAllMessagesByConv)
routerChat.post('/messages', sendNewMessage)


export default routerChat