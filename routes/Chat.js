import express from 'express';
import { getAllMyConversations, createNewConversation, getAllMessagesByConv, sendNewMessage } from '../controllers/Chat.js';
// import { VerifyToken } from '../middlewares/verifytoken.js';
const routerChat = express.Router();

routerChat.post('/conversations',getAllMyConversations)
routerChat.post('/conversations/new', createNewConversation)

routerChat.get('/messages/:user1_id/:user2_id', getAllMessagesByConv)
routerChat.post('/messages/new', sendNewMessage)



export default routerChat