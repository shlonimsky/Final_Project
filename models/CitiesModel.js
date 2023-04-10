import { Sequelize } from "sequelize";
// import isEmail from 'validator/es/lib/isEmail';
import db from '../config/database.js';

const {DataTypes} = Sequelize;

const CitiesIsrael = db.define("cities_israel",{
    title : {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true
        }}, 
    district : {
    type : DataTypes.STRING,
    allowNull: false,
    validate : {
        notEmpty: true
    }
},
},{
    timestamps : false,
    freezeTableName : true,
    tableName : 'cities_israel'
})

export default CitiesIsrael