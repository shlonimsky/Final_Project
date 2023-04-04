import express from "express";
import { register, login, getUsers, getMyProfile, postMyProfile, editMyProfile } from "../controllers/Users.js";
import {VerifyToken} from '../middlewares/verifytoken.js';
import jwt from 'jsonwebtoken';
const routerUsers = express.Router();

routerUsers.post('/register', register);
routerUsers.post('/login', login);
routerUsers.get('/users', VerifyToken, getUsers);
routerUsers.post('/cabinet/:id/set', postMyProfile)
routerUsers.put('/cabinet/:id/set', editMyProfile)
routerUsers.get('/cabinet/:id',VerifyToken, getMyProfile)

routerUsers.get('/token', VerifyToken, (req,res) => {
    const userID = req.id;
    const email = req.email;
    const accessToken = jwt.sign({userID,email}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : '60s'
    })

    res.cookie('accessToken', accessToken,{
        httpOnly : true,
        maxAge : 60*1000
    })
    console.log("userID,email in token",userID,email);
    res.status(200).json({msg : "ok",userID,email})
})

export default routerUsers