// import { Conversations } from "../models/UsersModels.js";
import {Conversations, Messages} from '../models/Chat.js';
// import Messages from '../models/MesagesModel.js';
import { Op } from "sequelize";

import dotenv from 'dotenv';
dotenv.config();

export const getAllMyConversations = async (req,res) => {
    const user_id = req.body.user_id

    try {
        const allConversations = await Conversations.findAll({
            where: { 
                [Op.or]: [{ sender_id: user_id }, { receiver_id: user_id }],
            }
        })
       res.json(allConversations)
    } catch (err) {
        console.log(err);
        res.status(404).json({msg: "Not Found"})
    }
}


export const createNewConversation = async (req,res) => {
    const {sender_id,receiver_id} = req.body
    try{
        const newConversation = await Conversations.findOrCreate({
            where: {  
                [Op.or]: [
                    {[Op.and]: [{ sender_id : sender_id}, { receiver_id : receiver_id }]},
                    {[Op.and]: [{ sender_id : receiver_id}, { receiver_id : sender_id }]},
                ],            },
            defaults: { 
                sender_id, receiver_id
            }
          });
        res.json(newConversation)
    }catch(err){
        console.log(err);
        if ( err.errors && err.errors[0].type === "unique violation") res.status(404).json({msg : "this chat allready exist"})
         else res.status(404).json(err)
    }
}

export const getAllMessagesByConv = async (req, res) => {
    const sender_id = req.params.sender_id
    const receiver_id = req.params.receiver_id
    let arr = []
    try {
        
        const ids = await Conversations.findAll({
            where: { 
                [Op.or]: [
                    {[Op.and]: [{ sender_id : sender_id}, { receiver_id : receiver_id }]},
                    {[Op.and]: [{ sender_id : receiver_id}, { receiver_id : sender_id }]},
                ],
            }
        }) 
        ids.map(item => arr.push(item.id))
        const allChat = await Messages.findAll({
            where: {conversation_id: arr}
        })
        res.json({...ids, allChat})
    } catch (err) {
        res.status(404).json({msg: "not found"})
    }
}

export const sendNewMessage = async (req,res) => {
    const {conversation_id,message,post_date,sender_id,sender_name} = req.body
    try {
        const newMessage = await Messages.create({
            conversation_id, message, post_date, sender_id, sender_name
        })
        res.json(newMessage)
    } catch (err) {
        res.status()
    }
}
