import CitiesIsrael from "../models/CitiesModel.js";
import dotenv from 'dotenv';
dotenv.config();

export const getAllCities = async(req,res) => {
    try {
        const cities = await CitiesIsrael.findAll()
        res.json(cities)
    } catch (err) {
        res.status(404).json({msg: "Not Found"})
    }
}