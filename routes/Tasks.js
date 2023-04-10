import express from 'express';
import { getAllTasks, createTask, getMyTasks, getMyJobs, getTask } from '../controllers/Tasks.js';
import { VerifyToken } from '../middlewares/verifytoken.js';
const routerTasks = express.Router();

routerTasks.get('/task/:id',getTask)
routerTasks.get('/my_tasks/:id',VerifyToken, getMyTasks)
routerTasks.get('/my_jobs/:id',VerifyToken,getMyJobs)
routerTasks.get('/tasks', getAllTasks)
routerTasks.post('/tasks', VerifyToken,createTask)


export default routerTasks