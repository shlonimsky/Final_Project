import Users from "../models/UsersModels.js";
import UserInfo from "../models/UsersInfoModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const getUsers = async (req,res) => {
    try{
        const users = await Users.findAll({
            attributes : ["id", "email"]
        });
        res.json(users);
    } catch(err){
        res.status(404).json({msg : "Users not found"})
    }
}

export const my_profile = async (req,res) => {
    
    try{
        const user_info = await UserInfo.findAll({
            where : {
                user_id : req.params.id
            }
        });
        
        if ( user_info.length > 0) res.json(user_info)
        else throw Error("user not found")
    } catch (err){
        console.log("my profile error => ",err)
        res.status(404).json({msg : err.message})
    }
}


export const login = async (req,res) => {
    try{
        const user = await Users.findAll({
            where : {
                email : req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if( !match ) return res.status(400).json({msg : "Wrong password"})

        const userID = user[0].id;
        const email = user[0].email;
        const accessToken = jwt.sign({userID,email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '60s'
        })

        res.cookie('accessToken', accessToken, {
            httpOnly : true,
            maxAge : 60*1000
        })
        console.log("cookies",req.cookies)
        res.json({accessToken});
    } catch (err){
        console.log(err);
        res.status(404).json({msg : "Email not found"});
    }
}



export const register = async (req,res) => {
    const {email , password} = req.body;
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password,salt);

    try{
        if(password.length === 0 || !password || /^\s*$/.test(password)) throw  Error("Please,enter the strong password")
        await Users.create({
            email : email,
            password : hashPass
        })
        res.json({msg : "Register went Successful!"})
    } catch (err){
        console.log(err.message)
        if (!err.errors) return res.status(403).json({msg : err.message})
        const {type,path,validatorKey,validatorName} = err.errors[0]
        console.log("err=>", err.errors[0],"**********************");
        switch (type){
            case "Validation error" : res.status(403).json({msg : `Please, enter the correct ${path}`})
            case "unique violation" : res.status(403).json({msg : "Email already exist!"});
            default : res.status(403).json({msg : "Oops, something went wrong! Try again"});
        }
    }
}

export const editProfile = async (req,res) => {
    const {user_id, first_name, last_name, phone} = req.body
}
