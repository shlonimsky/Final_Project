import express from 'express';
import { getCategories,getCategory } from '../controllers/Categories.js';
const routerCategories = express.Router();

routerCategories.get('/categories', getCategories);
routerCategories.get('/category/:id', getCategory)

export default routerCategories;