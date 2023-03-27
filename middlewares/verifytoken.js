import jwt from 'jsonwebtoken';
import Users from '../models/UsersModels.js';
import dotenv from 'dotenv';
dotenv.config();

export const VerifyToken = (req,res,next) => {
    console.log(req.cookies)
    const accessToken = req.cookies.accessToken  || req.headers['x-access-Token'];
console.log(accessToken)
    if( !accessToken) return res.status(401).json({msg : "permission denied!"});
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err,decoded) => {
        if(err) return res.status(403).json({msg : "Verify token failed!"})
        console.log(req);
        try{
            const user = await Users.findAll({
                where : {
                    email : decoded.email
                }
            })
            user.length === 0 ? 
            res.status(403).json({msg : "Verify user failed!"}) : next()

        } catch (err){
            res.status(403).json({msg : "Verify user failed!"})
        }
    })
}