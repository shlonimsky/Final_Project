import Helpers from '../models/HelpersModel.js';
import UserInfo from '../models/UsersInfoModel.js';
import Tasks from '../models/TasksModel.js'
import HelpersReviews from '../models/HelpersReviesModel.js'
import { Op } from 'sequelize';
import db from '../config/database.js';
// import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// export const getAllHelpers = async (req,res) => {
//     try {
//         const allHelpers = await Helpers.findAll()
//         res.json(allHelpers)
//     } catch (err) {
//         console.log(err);
//         res.status(404).json({msg: "not found"})
//     }
// }

// export const getAllHelpersByCetog = async (req,res) => {
//     let ids = []
//     try {
//         const myCategories = await Helpers.findAll({
//             where: {category_id : req.params.id}
//         })
//         myCategories.map(a => ids.push(a.user_id))
//         const found = await UserInfo.findAll({ where: { user_id: {[Op.in]: ids } } }); 
//         res.json(found)
//     } catch (err) {
//         console.log(err);
//         res.status(404).json({err})
//     }
// }

export const getAllCategoriesByUserID = async (req,res) => {
    try {
        const myCategories = await Helpers.findAll({
            where: {user_id : req.params.id}
        })
        res.json(myCategories)
    } catch (err) {
        console.log(err);
        res.status(404).json({err})
    }
}

export const postNewHelper = async (req,res) => {
// data : [
//     {user_id, category_id}, {user_id, category_id},...
// ]
// const [data] = req.body.data
    // console.log("=====> data=",data);
    try {
        const deleteHelper = await Helpers.destroy({
            where: {user_id : req.body.data[0]["user_id"]}
        })
        const newHelper = await Helpers.bulkCreate(req.body.data)
        res.json(newHelper)
    } catch (err) {
        console.log(err);
        res.status(404).json({err})
    }
}

// export const getUsersByInfo = async (req,res) => {
//     const info = req.query.info;
//     try {
//         info.replace(" ", "%")
//         console.log(info);
//         const foundUsers = await UserInfo.findAll({
//             where: {
//                 info: {
//                 [Op.iLike]: `%${info}%`
//               }}
//         })
//         res.json(foundUsers)
//     } catch (err) {
//         console.log(err);
//         res.status(404).json({err})
//     }
// }

// //tasks----------

// export const getTasksByCategory = async (req, res) => {
//     try {
//         const allTasks = await Tasks.findAll({
//             where: {
//                 category_id: req.params.id
//             }
//         })
//         res.json(allTasks)
//     } catch (err) {
//         console.log(err);
//         res.status(404).json({err})
//     }
// }

// export const getTasksByTitle = async (req,res) => {
//     const info = req.query.info;

//     try {
//         info.replace(" ", "%")
//         const allTasks = await Tasks.findAll({
//             where: {
//                 [Op.or]: [
//                     {title: {[Op.iLike]: `%${info}%`}},
//                     {description : { [Op.iLike]: `%${info}%` }}
//                 ]
//             }
//         })
//         res.json(allTasks)
//     } catch (err) {
//         console.log(err);
//         res.status(404).json({err})
//     }
// }

//REVIEWS-------
export const getUsersReviews = async (req, res) => {
    try {
        const reviews = await HelpersReviews.findAll({
            where: {user_id : req.params.user_id},
        })
        const [avg] = await db.query(`SELECT SUM(rating)/COUNT(rating) as average FROM "public"."rating_reviews"
        WHERE user_id=${req.params.user_id}`)
        // const average = avg[0].average
        // const rating = await HelpersReviews.findAll
        res.json({reviews,average: avg[0]["average"] })
    } catch (err) {
        console.log(err);
        res.status(404).json(err)
    }
}

export const postNewReview = async (req, res) => {
    const {user_id, rating, review, sender_name} = req.body
    // const user_id = req.params.user_id

    try {
        const newReview = await HelpersReviews.create({user_id,rating,review, sender_name})
        res.json(newReview)
    } catch (err) {
        res.status(403).json(err)
    }
}