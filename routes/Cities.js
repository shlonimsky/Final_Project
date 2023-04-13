import express from 'express';
import { getAllCities } from '../controllers/Cities.js';
// import { getAllTasks, createTask, getMyTasks, getMyJobs, getTask } from '../controllers/Tasks.js';
// import { VerifyToken } from '../middlewares/verifytoken.js';
const routerCities = express.Router();

routerCities.get('/cities',getAllCities)



export default routerCities