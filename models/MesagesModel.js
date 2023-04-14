import { Sequelize } from "sequelize";
import db from '../config/database.js';


const {DataTypes} = Sequelize;

const Messages = db.define("messages",{
    conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    post_date : {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()')
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sender_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }

},{  timestamps : false,
    freezeTableName : true,
    tableName : 'messages'
})

export default Messages