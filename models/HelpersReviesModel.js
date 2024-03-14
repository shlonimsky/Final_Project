import { Sequelize } from "sequelize";
import db from "../config/database.js";
import UserInfo from "./UsersInfoModel.js"
const {DataTypes} = Sequelize;

const HelpersReviews = db.define("rating_reviews",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
    user_id : {
        type : DataTypes.INTEGER,
        references: {
            model: 'UserInfo',
            key: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
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
            // isInt: true,
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
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        // defaultValue: Sequelize.literal('NOW()')
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
    tableName : 'rating_reviews'
})

HelpersReviews.belongsTo(UserInfo, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

export default HelpersReviews