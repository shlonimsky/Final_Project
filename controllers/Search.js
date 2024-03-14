import Helpers from '../models/HelpersModel.js';
import UserInfo from '../models/UsersInfoModel.js';
import Users from '../models/UsersModels.js'
import Tasks from '../models/TasksModel.js'
// import HelpersReviews from '../models/HelpersReviesModel.js'
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

export const getAllHelpers = async (req,res) => {
    const info = req.query.search ? req.query.search : "%%";
    const city = req.query.city ? req.query.city : "%%";
    const category = req.query.category

    try {
        if (category) {
            const foundUsers = await UserInfo.findAll({
                include: [{
                    model: Helpers, //  create a left join
                    where: {category_id: category}
                  }],
                  where: { 
                    [Op.and]: [
                        { info: {[Op.substring]: info} },
                        { city: {[Op.substring]: city} }
                      ]
                },
                })
            res.json({foundUsers})
        } else {
            const foundUsers = await UserInfo.findAll({
                include: [{
                    model: Helpers, //  create a left join
                  }],
                  where: { 
                    [Op.and]: [
                        { info: {[Op.substring]: info} },
                        { city: {[Op.substring]: city} }
                      ]
                },
                })
            res.json({foundUsers})
        }
        
    } catch (err) {
        console.log(err);
        res.status(404).json({msg: err})
    }
}

export const getAllHelpersByCetog = async (req,res) => {
    let ids = []
    try {
        const myCategories = await Helpers.findAll({
            where: {category_id : req.params.id}
        })
        myCategories.map(a => ids.push(a.user_id))
        const found = await UserInfo.findAll({ where: { user_id: {[Op.in]: ids } } }); 
        res.json(found)
    } catch (err) {
        console.log(err);
        res.status(404).json({err})
    }
}

export const getUsersByInfo = async (req,res) => {
    const info = req.query.search ? req.query.search : "";
    const category = req.query.category ? req.query.category : "";
    try {
        // const foundUsers = await UserInfo.findAll({
        //     where: {
        //         info: {
        //         [Op.iLike]: `%${info}%`
        //       }}
        // })
        res.json({info, category})
        
    } catch (err) {
        console.log(err);
        res.status(404).json({err})
    }
}



//tasks----------

export const getTasksByCategory = async (req, res) => {
    try {
        const allTasks = await Tasks.findAll({
            where: {
                category_id: req.params.id
            }
        })
        res.json(allTasks)
    } catch (err) {
        console.log(err);
        res.status(404).json({err})
    }
}


export const getTasksByTitle = async (req,res) => {
    const info = req.query.search ? req.query.search : '';
    const city = req.query.city ? req.query.city : "%%";
    const category = req.query.category

    try {
        if (category) {
            const foundTasks = await Tasks.findAll({
                  where: {
                    [Op.and]: [
                        {city: {[Op.substring]: city}},
                        { [Op.or]: [
                            {title: {[Op.iLike]: `%${info}%`}},
                            {description : { [Op.iLike]: `%${info}%` }}
                        ]},
                        {category_id: category},
                    ]
                },
                })
            res.json({foundTasks})
        } else {
            const foundTasks = await Tasks.findAll({
                where: {
                  [Op.and]: [
                      {city: {[Op.substring]: city}},
                      { [Op.or]: [
                          {title: {[Op.iLike]: `%${info}%`}},
                          {description : { [Op.iLike]: `%${info}%` }}
                      ]}
                  ]
              },
              })
          res.json({foundTasks})
        }
        
    } catch (err) {
        console.log(err);
        res.status(404).json({msg: err})
    }





    // try {
    //     // info.replace(" ", "%")
    //     const allTasks = await Tasks.findAll({
    //         where: {
    //             [Op.or]: [
    //                 {title: {[Op.iLike]: `%${info}%`}},
    //                 {description : { [Op.iLike]: `%${info}%` }}
    //             ]
    //         }
    //     })
    //     res.json(allTasks)
    // } catch (err) {
    //     console.log(err);
    //     res.status(404).json({err})
    // }
}