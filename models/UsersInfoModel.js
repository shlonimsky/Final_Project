import { Sequelize } from "sequelize";
import db from '../config/database.js';

const {DataTypes} = Sequelize;

const UserInfo = db.define("users_info",{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate : {
            isInt: true,
            notEmpty: true
        }
    },
    first_name : {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true,
            is: /^[A-Za-z\s]*$/
        }
    },
    last_name : {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true,
            is: /^[A-Za-z\s]*$/
        }
    },
    city : {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true,
        }
    },
    birth_date : {
        type : DataTypes.DATEONLY,
        allowNull: false,
        validate : {
            notEmpty: true
        }
    },
    gender : {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true,
            isAlpha: true, 
            isIn: [['female', 'male','other']]
        }
    },
    info : DataTypes.TEXT,
    avatar: DataTypes.TEXT
}, {
    timestamps : false,
    freezeTableName : true,
    tableName : 'users_info'
}
)
export default UserInfo