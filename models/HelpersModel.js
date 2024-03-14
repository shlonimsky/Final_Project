import { Sequelize } from "sequelize";
import db from "../config/database.js";
import UserInfo from "./UsersInfoModel.js";

const {DataTypes} = Sequelize;

const Helpers = db.define("helpers",{
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
    category_id : {
        type : DataTypes.INTEGER,
        references: {
            model: 'Categories',
            key: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
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

// Define the association between UserInfo and Helper
UserInfo.hasMany(Helpers, { foreignKey: 'user_id' });
Helpers.belongsTo(UserInfo, { foreignKey: 'user_id' });

export default Helpers