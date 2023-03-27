import express from "express";
import { register, login, getUsers, my_profile } from "../controllers/Users.js";
import {VerifyToken} from '../middlewares/verifytoken.js';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', VerifyToken, getUsers);
router.get('/cabinet/:id',VerifyToken, my_profile)
router.get('/token', VerifyToken, (req,res) => {
    const userID = req.id;
    const email = req.email;
    const accessToken = jwt.sign({userID,email}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : '60s'
    })

    res.cookie('accessToken', accessToken,{
        httpOnly : true,
        maxAge : 60*1000
    })
    res.status(200).json({msg : "ok"})
})

export default router