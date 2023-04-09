import { Sequelize } from "sequelize";
// import isEmail from 'validator/es/lib/isEmail';
import db from '../config/database.js';

const {DataTypes} = Sequelize;

const Users = db.define("users",{
    email : {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate : {
            isEmail: true,
            notEmpty: true,
        }
     
    },
    password : {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true
        }
    },
    created_date: DataTypes.DATEONLY
}, {
    timestamps : false,
    freezeTableName : true,
    tableName : 'users'
}
)
export default Users