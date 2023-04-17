import express from "express";
import { getAllHelpers, getAllHelpersByCetog, getAllCategoriesByUserID, postNewHelper, getUsersByInfo,
    getTasksByCategory, getTasksByTitle, getUsersReviews} from "../controllers/HelpersReviews.js";
const routerHelpersReviews = express.Router()

routerHelpersReviews.get('/helpers/search', getUsersByInfo)
routerHelpersReviews.get('/helpers/me/:id', getAllCategoriesByUserID )
routerHelpersReviews.get('/helpers/:id',getAllHelpersByCetog)
routerHelpersReviews.get('/helpers', getAllHelpers )
routerHelpersReviews.post('/helpers', postNewHelper)

routerHelpersReviews.get('/tasks/search',getTasksByTitle)
routerHelpersReviews.get('/tasks/:id',getTasksByCategory )
routerHelpersReviews.get('/reviews/:user_id', getUsersReviews)

// routerHelpersReviews.get('/helpers/search', checkQuery)

export default routerHelpersReviews