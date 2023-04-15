import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Helpers = db.define("helpers",{
    user_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        validate : {
            isInt: true,
            notEmpty: true
        }
    },
    category_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        validate : {
            isInt: true,
            notEmpty: true
        }
    },
},{
    timestamps : false,
    freezeTableName : true,
    tableName : 'helpers'
})
Helpers.removeAttribute('id')


export default Helpers