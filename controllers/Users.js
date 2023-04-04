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

export const getMyProfile = async (req,res) => {
    try{
        const user_info = await UserInfo.findAll({
            where : {
                user_id : req.params.id
            }
        });
        console.log("user in getProfile",user_info)
        if ( user_info.length > 0) res.json(user_info[0])
        else throw Error("user not found")
    } catch (err){
        console.log("my profile error => ",err)
        res.status(403).json({msg : err.message})
    }
}


export const login = async (req,res) => {
    try{
        const user = await Users.findAll({
            where : {
                email : req.body.email
            }
        })
        // console.log(user)
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
   
        res.json({accessToken,userID,email});
    } catch (err){
        console.log(err);
        res.status(404).json({msg : "Email not found"});
    }
}

export const postMyProfile = async (req,res) => {
    const {fname, lname, city, birth, gender, info} = req.body;

    try{
        // const d = new Date(birth)
        // console.log("**** d =>",d)
        await UserInfo.create({
            user_id : req.params.id,
            first_name : fname,
            last_name : lname,
            city : city,
            birth_date : birth,
            gender : gender,
            info : info
        });
        res.json({msg : "ok"});
    } catch (err){
        console.log("ERROR => ", err)
       if (err.errors){
            const {type,path} = err.errors[0]
            console.log(err)
            switch (type){
                case "Validation error" : return res.status(403).json({msg : `Please, enter the correct ${path}`})
                case "unique violation" : return res.status(403).json({msg : "Email already exist!"});
                default : return res.status(403).json({msg : "Oops, something went wrong! Try again"});
                }
       }
    else return res.status(404).json({msg : "Not found"});
    }
}

export const editMyProfile = async (req,res) => {
    const {fname, lname, city, birth, gender, info} = req.body;
    try {
        await UserInfo.update({
            first_name : fname,
            last_name : lname,
            city : city,
            birth_date : birth,
            gender : gender,
            info : info
        }, {where : {user_id : req.params.id} });
        res.json({msg : "ok"});
    } catch (err) {
        console.log("ERROR => ", err)
        if (err.errors){
             const {type,path} = err.errors[0]
             console.log(err)
             switch (type){
                 case "Validation error" : return res.status(403).json({msg : `Please, enter the correct ${path}`})
                 case "unique violation" : return res.status(403).json({msg : "Email already exist!"});
                 default : return res.status(403).json({msg : "Oops, something went wrong! Try again"});
                 }
        }
     else return res.json({msg : "Not found"});
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
            case "Validation error" : return res.status(403).json({msg : `Please, enter the correct ${path}`})
            case "unique violation" : return res.status(403).json({msg : "Email already exists!"});
            default : return res.status(403).json({msg : "Oops, something went wrong! Try again"});
        }
    }
}

export const editProfile = async (req,res) => {
    const {user_id, first_name, last_name, phone} = req.body
}
