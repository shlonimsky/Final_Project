import Tasks from "../models/TasksModel.js";
import dotenv from 'dotenv';
dotenv.config();

export const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Tasks.findAll()
        res.json(allTasks)
    } catch (err) {
        res.status(404).json({nsg: 'Not found', err})
    }
}
export const getMyTasks = async (req,res) => {
const user_id = req.params.id
try {
    const myTasks = await Tasks.findAll({
        where : {user_id : req.params.id}
    })
    if (myTasks.length>0) res.json(myTasks)
    else res.status(204).json({msg:"you don't have any task"})
} catch (err) {
    res.status(404).json({msg:"Not found"})
}
}

export const createTask = async (req,res) => {
    const {user_id, title, description, category_id, city, address, start_date, finish_date, salary, is_bargain, img} = req.body
    try {
        const newTask = await Tasks.create({
            user_id, title, description, category_id, city, address, start_date, finish_date, salary, is_bargain, img
        })
        res.json(newTask)
    } catch (err) {
        console.log("error in createTask ===>",err)
        res.status(403).json({msg : "Oops, something went wrong! Try again"})
    }
}

export const updateTask = async (req, res) => {
    const helper_id = req.body.helper_id;
    const id = req.params.id
    try {
        const task = await Tasks.update({helper_id},{where:{id}})
        res.json({task, msg: "Task was completed successfully"})
    } catch (err) {
        res.status(403).json(err)
    }
}

export const closeTask = async (req, res) => {
    const {salary, id} = req.body
    console.log("IN THE COOONTROLLER",salary, id );
    try {
        const task = await Tasks.update({ salary, status: "completed"},{where:{id}})
        res.json({task, msg: "Task was completed successfully"})
    } catch (err) {
        res.status(403).json(err)
    }
}

export const deleteTask = async (req, res) => {
    const id = req.params.id
    try {
        await Tasks.destroy({
            where: {
                id
            }
        })
        res.json({msg: "Task was deleted successfully"})
    } catch (err) {
        res.status(403).json({msg : "Oops, something went wrong! Try again"})
    }
}

export const getMyJobs = async (req,res) => {
    try {
        const myJobs = await Tasks.findAll({
            where: {helper_id: req.params.id}
        })
        if(myJobs.length>0) res.json(myJobs)
        else res.status(204).json({msg : "you don't have any jobs"})
    } catch (err) {
        console.log("error in createTask ===>",err)
        res.status(404).json({msg : "Oops, something went wrong! Try again"})
    }
}
export const getTask = async (req,res) => {
    try {
        const task = await Tasks.findAll({
            // attributes: [
            //     'id',
            //     'user_id',
            //     'title',
            //     [Sequelize.literal('"start_date" AT TIME ZONE \'Asia/Jerusalem\''), 'start_date'],
            //     [Sequelize.literal('"finish_date" AT TIME ZONE \'Asia/Jerusalem\''), 'finish_date'],
            //     [Sequelize.literal('"post_date" AT TIME ZONE \'Asia/Jerusalem\''), 'post_date'],
            //     'salary',
            //     'is_bargain',
            //     'status',
            //     'helper_id'
            //   ],
            where: {id: req.params.id},
            order: [
                ['start_date', 'ASC']
              ]
            
        })
        if(task.length>0) res.json(task[0])
        else res.status(204).json({msg : "Not Found"})
    } catch (err) {
        console.log(err);
        res.status(404).json({msg : "Oops, something went wrong! Try again"})
    }
}