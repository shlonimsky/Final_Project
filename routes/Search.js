import express from "express";
const routerSearch = express.Router()

import { getAllHelpers, getAllHelpersByCetog, getUsersByInfo,
    getTasksByCategory, getTasksByTitle} from "../controllers/Search.js";

    // routerSearch.get('/helpers', getAllHelpers )


    routerSearch.get('/helpers', getAllHelpers )
    // routerSearch.get('/helpers/:id',getAllHelpersByCetog)
    // routerSearch.get('/helpers', getUsersByInfo)

    routerSearch.get('/tasks',getTasksByTitle)
    // routerSearch.get('/tasks/:id',getTasksByCategory )

export default routerSearch
