import express from "express";
import { register, login, getAllUsers, getUserByID, getUserAsHelper, getMyProfile, postMyProfile,editAvatar, editMyProfile, logOut } from "../controllers/Users.js";
import {VerifyToken} from '../middlewares/verifytoken.js';
import jwt from 'jsonwebtoken';
const routerUsers = express.Router();

routerUsers.post('/register', register);
routerUsers.post('/login', login);
routerUsers.get('/user/:id', getUserByID);
routerUsers.get('/users', getAllUsers)
routerUsers.get('/helper/:id', getUserAsHelper);
routerUsers.post('/cabinet/:id/set', VerifyToken, postMyProfile)
routerUsers.put('/cabinet/:id/set/avatar', VerifyToken, editAvatar)
routerUsers.put('/cabinet/:id/set', VerifyToken, editMyProfile)
routerUsers.get('/cabinet/:id',VerifyToken, getMyProfile)
routerUsers.delete('/logout', logOut)

routerUsers.get('/token', VerifyToken, (req,res) => {
    // console.log(req)
    const userID = req.id;
    const email = req.email;
    const accessToken = jwt.sign({userID,email}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : '24h'
    })

    res.cookie('accessToken', accessToken,{
        httpOnly : true,
        maxAge : 24*60*60*1000
    })
    res.status(200).json({ accessToken })
})

export default routerUsers