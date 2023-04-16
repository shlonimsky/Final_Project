import Offers from "../models/OffersModel.js";
import Tasks from "../models/TasksModel.js";
import dotenv from 'dotenv';
dotenv.config();


export const getAllOffersForTask = async (req, res) => {
try {
    const allOffers = await Offers.findAll({
        where: { task_id: req.params.task_id}
    })
    res.json(allOffers)
} catch (err) {
    res.status(404).json({msg: "Not found"})
}
}

export const getAmountUnreadOffers = async (req,res) => {
    const user_id = req.params.user_id;
    let ids = [];
    // console.log("ID-----",user_id);

    try {
        const alltasks = await Tasks.findAll({
            where: {user_id, status: "open"}
        })
        // console.log("AllTasks=====>", alltasks);
        alltasks.map(task => ids.push(task.id))
        const unreadOffers = await Offers.count({
            where: {is_read: false, task_id: ids}
        })
        res.json(unreadOffers)
        // const unreadOffers = await Offers.findAll({
        //     where: {is_read: false, task_id: ids}
        // })
        // res.json(unreadOffers)
    } catch (err) {
        res.status(404).json({err})
    }
}

export const getAllUnreadOffers = async (req,res) => {
    const user_id = req.params.user_id;
    let ids = [];

    try {
        const alltasks = await Tasks.findAll({
            where: {user_id, status: "open"}
        })
        alltasks.map(task => ids.push(task.id))
        const unreadOffers = await Offers.findAll({
            where: {is_read: false, task_id: ids}
        })
        const changeValue = await Offers.update(
            {is_read: true},
            {where: {task_id: ids}}
        )
        console.log(changeValue);
    
        res.json(unreadOffers)
    } catch (err) {
        res.status(404).json({err})
    }
}

export const setReadOffers = async (req,res) => {
    try {
        const offer = await Offers.update(
            {
            is_read: true
        },{
            where : {id: req.params.offer_id}
        })
        res.json(offer)
    } catch (err) {
        res.status(404).json({msg: "not found"})
    }
}

export const postNewOffer = async (req,res) => {
    const {task_id,helper_id,price,comment, first_name} = req.body
    try {
        const newOffer = await Offers.create({
            task_id,helper_id,price,comment, first_name
        })
        res.json(newOffer)
    } catch (err) {
        console.log(err);
        res.status(404).json({msg : "not found"})
    }
}
export const deleteOfferById = async (req,res) => {
    try {
        const remove = await Offers.destroy({
            where: {id: req.params.id}
        })
        res.json(remove)
    } catch (err) {
        res.status(404).json({msg : "not found"})
    }
}