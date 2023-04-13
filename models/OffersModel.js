import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Offers = db.define("offers",{
    task_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
            notEmpty: true
        }
    },
    helper_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
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

    price: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    is_read: DataTypes.BOOLEAN,
    post_date : DataTypes.DATEONLY
},{
    timestamps : false,
    freezeTableName : true,
    tableName : 'offers'
})

export default Offers