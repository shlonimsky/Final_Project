import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Categories = db.define("categories",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    title : {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate : {
            notEmpty: true,
            is: /^[A-Za-z\s]*$/
        }
    },
    description : {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true
        }
    }
},{
    timestamps : false,
    freezeTableName : true,
    tableName : 'categories'
})

export default Categories