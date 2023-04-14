// import { Conversations } from "../models/UsersModels.js";
import {Conversations, Messages} from '../models/Chat.js';
import UserInfo from '../models/UsersInfoModel.js';
import { Sequelize } from "sequelize";
// import Messages from '../models/MesagesModel.js';
import { Op } from "sequelize";
import db from '../config/database.js';

import dotenv from 'dotenv';
dotenv.config();

// export const getAllMyConversations = async (req,res) => {
//     const user_id = req.body.user_id

//     try {
//         const allConversations = await Conversations.findAll({
//             where: { 
//                 [Op.or]: [{ sender_id: user_id }, { receiver_id: user_id }],
//             }
//         })
//        res.json(allConversations)
//     } catch (err) {
//         console.log(err);
//         res.status(404).json({msg: "Not Found"})
//     }
// }

export const getAllMyConversations = async (req,res) => {
        const user_id = req.body.user_id
    
        try {
            const [results, metadata] = await db.query(`
            SELECT  c.id, sender_id, us.first_name as sender_name, receiver_id, ur.first_name as receiver_name  FROM "public"."conversations" as c
            left join "public"."users_info" as us
             ON us.user_id = c. sender_id
            left join "public"."users_info" as ur
             ON ur.user_id = c. receiver_id
            Where sender_id = ${user_id} OR receiver_id=${user_id}`)
           res.json(results)
        } catch (err) {
            console.log(err);
            res.status(404).json({msg: "Not Found"})
        }
    }
    

// const { conversations, users_info } = require('../models'); // replace with your model files

// conversations.findAll({
//   attributes: ['id', 'sender_id', 'receiver_id'],
//   include: [
//     { 
//       model: users_info,
//       as: 'sender_info',
//       attributes: ['first_name'],
//       where: { user_id: Sequelize.col('conversations.sender_id') }
//     },
//     {
//       model: users_info,
//       as: 'receiver_info',
//       attributes: ['first_name'],
//       where: { user_id: Sequelize.col('conversations.receiver_id') }
//     }
//   ]
// });






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
    const {sender_id, receiver_id} = req.body
    try {
        const chat = await Conversations.findAll({
            where: {  
                [Op.or]: [
                    {[Op.and]: [{ sender_id : sender_id}, { receiver_id : receiver_id }]},
                    {[Op.and]: [{ sender_id : receiver_id}, { receiver_id : sender_id }]},
                ]},
            defaults: { 
                sender_id, receiver_id
            }
        }) 
        console.log(chat);
        const allMessages = await Messages.findAll({
            where: {conversation_id: chat[0].id},
            order: [
                ['post_date', 'ASC'],
            ],
        })
        res.json(allMessages)
    } catch (err) {
        res.status(404).json({msg: "not found"})
    }
}
//old variant works
// export const getAllMessagesByConv = async (req, res) => {
//     const sender_id = req.params.sender_id
//     const receiver_id = req.params.receiver_id
//     let arr = []
//     try {
        
//         const ids = await Conversations.findAll({
//             where: { 
//                 [Op.or]: [
//                     {[Op.and]: [{ sender_id : sender_id}, { receiver_id : receiver_id }]},
//                     {[Op.and]: [{ sender_id : receiver_id}, { receiver_id : sender_id }]},
//                 ],
//             }
//         }) 
//         ids.map(item => arr.push(item.id))
//         const allChat = await Messages.findAll({
//             where: {conversation_id: arr}
//         })
//         res.json({...ids, allChat})
//     } catch (err) {
//         res.status(404).json({msg: "not found"})
//     }
// }

export const sendNewMessage = async (req,res) => {
    const {conversation_id,message,post_date,sender_id,sender_name} = req.body
    try {
        const newMessage = await Messages.create({
            conversation_id, message, post_date, sender_id, sender_name
        })
        console.log(newMessage);
        res.json(newMessage)
    } catch (err) {
        res.status()
    }
}
