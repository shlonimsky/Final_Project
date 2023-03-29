import Categories from "../models/CategoriesModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const getCategories = async (req,res) => {
    try {
        const allCategories = await Categories.findAll({
            attributes : ["id", "title", "description"]
        })
        res.json(allCategories)
    } catch (err) {
        console.log(err)
        res.status(404).json({msg : "Error"})
    }
}