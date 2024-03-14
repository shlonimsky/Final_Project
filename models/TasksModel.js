import { Sequelize } from "sequelize";
import db from "../config/database.js";
const {DataTypes} = Sequelize;

const Tasks = db.define("tasks",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    user_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
        validate : {
            isInt: true,
            notEmpty: true
        }
    },
    title : {
            type : DataTypes.STRING,
            allowNull: false,
            validate : {
                notEmpty: true
            }
    },
    description : DataTypes.TEXT,

    category_id : {
        type : DataTypes.INTEGER,
        allowNull: false,
            validate : {
                notEmpty: true
            }
    },
    city: {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true
        }
    },
    address : {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
            notEmpty: true
        }
    },
    start_date : {
        type : DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    finish_date : {
        type : DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    post_date : { 
        type : DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: 'TIMESTAMP'
    },
    salary : {
        type : DataTypes.INTEGER,
        allowNull: false,
        validate : {
            isNumeric: true,
            isInt: true,
            min : 0,
        }
    },
    is_bargain : {
        type : DataTypes.BOOLEAN,
        allowNull: false,
        validate : {
            isIn: [[true, false]],
        }
    },
    img: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false, // or false, depending on your requirements
        defaultValue: []
    },
    status : {
        type : DataTypes.STRING,
        allowNull: false,
        defaultValue: 'open',
        validate : {
            isIn: [['open', 'in proccess','completed']],
        }
    },
    helper_id : {
        type : DataTypes.INTEGER,
        allowNull: true,
    }
},{
    timestamps : false,
    freezeTableName : true,
    tableName : 'tasks'
})

export default Tasks