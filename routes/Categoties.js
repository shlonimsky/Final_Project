import express from 'express';
import { getCategories } from '../controllers/Categories.js';
const routerCategories = express.Router();

routerCategories.get('/categories', getCategories);

export default routerCategories;