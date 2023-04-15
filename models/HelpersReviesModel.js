import { Sequelize } from "sequelize";
import db from "../config/database.js";
const {DataTypes} = Sequelize;

const HelpersReviews = db.define("rating_reviews",{
    user_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        validate : {
            isInt: true,
            notEmpty: true
        }
    }, 
    rating : {
        type : DataTypes.INTEGER,
        allowNull: false,
        validate : {
            isInt: true,
            notEmpty: true,
            isIn: [[1, 2, 3, 4, 5]]
        }
    },
    review : {
        type : DataTypes.TEXT,
        allowNull: false,
    },
    post_date : {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()')
    },
    sender_name : {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true,
            is: /^[A-Za-z\s]*$/
        }
    }
},{
    timestamps : false,
    freezeTableName : true,
    tableName : 'users_info'
})

export default HelpersReviews