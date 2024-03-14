import express from 'express';
import { getAllTasks, createTask, updateTask, closeTask, deleteTask, getMyTasks, getMyJobs, getTask } from '../controllers/Tasks.js';
import { VerifyToken } from '../middlewares/verifytoken.js';
const routerTasks = express.Router();

routerTasks.get('/task/:id',getTask)
routerTasks.put('/task/:id',VerifyToken, updateTask)
routerTasks.delete('/task/:id', VerifyToken, deleteTask)
routerTasks.get('/my_tasks/:id',VerifyToken, getMyTasks)
routerTasks.get('/my_jobs/:id',VerifyToken,getMyJobs)
routerTasks.get('/tasks', getAllTasks)
routerTasks.post('/tasks', VerifyToken,createTask)
routerTasks.put('/close_task/', closeTask)

// routerTasks.get('/jobs/:id')

export default routerTasks