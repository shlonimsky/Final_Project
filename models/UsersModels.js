import { Sequelize } from "sequelize";
// import isEmail from 'validator/es/lib/isEmail';
import db from '../config/database.js';
import UserInfo from "./UsersInfoModel.js";


const {DataTypes} = Sequelize;

 const Users = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate : {
        isEmail: true,
        notEmpty: true,
    }
  },
  password: {
    type: DataTypes.STRING(1000),
    allowNull: false,
    validate : {
                    notEmpty: true
                }
  },
  created_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('NOW()')
  }
},{
        timestamps : false,
        freezeTableName : true,
        tableName : 'users'
    });

    // Define the association between User and UserInfo
    Users.hasOne(UserInfo, { foreignKey: 'user_id' });
    UserInfo.belongsTo(Users, { foreignKey: 'user_id' });

// export const UserInfo = db.define('users_info', {
// //   id: {
// //     type: DataTypes.INTEGER,
// //     primaryKey: true,
// //     autoIncrement: true
// //   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     unique: true,
//     validate : {
//         isInt: true,
//         notEmpty: true
//     },
//     // references: {
//     //   model: Users,
//     //   key: 'id'
//     // },
//     // onDelete: 'CASCADE',
//     // onUpdate: 'CASCADE'
//   },
//   first_name: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//     validate : {
//         notEmpty: true,
//         is: /^[A-Za-z\s]*$/
//     }
//   },
//   last_name: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//     validate : {
//         notEmpty: true,
//         is: /^[A-Za-z\s]*$/
//     }
//   },
//   city: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//     validate : {
//         notEmpty: true,
//     }
//   },
//   birth_date: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//     validate : {
//         notEmpty: true
//     }
//   },
//   gender: {
//     type: DataTypes.ENUM('female', 'male', 'other'),
//     allowNull: false,
//     validate : {
//         notEmpty: true,
//         isAlpha: true, 
//     }
//   },
//   info: {
//     type: DataTypes.TEXT,
//     allowNull: true
//   }
// },{
//     timestamps : false,
//     freezeTableName : true,
//     tableName : 'users_info'
// });

// Define associations
// Users.hasOne(UserInfo, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// UserInfo.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Synchronize the models with the database
// db.sync();

// const Users = db.define("users",{
//     email : {
//         type : DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate : {
//             isEmail: true,
//             notEmpty: true,
//         }
//     },
//     password : {
//         type : DataTypes.STRING,
//         allowNull: false,
//         validate : {
//             notEmpty: true
//         }
//     },
//     created_date: DataTypes.DATEONLY
// }, {
//     timestamps : false,
//     freezeTableName : true,
//     tableName : 'users'
// }
// )

// Users.hasOne(UserInfo, {
//     foreignKey: 'user_id'
//   });
//   UserInfo.belongsTo(Users);

// export const Conversations = db.define("conversations",{
//     user1_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: Users, 
//           key: 'id'
//         },
//       },
//       user2_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: UserInfo, 
//           key: 'user_id'
//         }
//       }
//     }, {
//         timestamps : false,
//         freezeTableName : true,
//         tableName : 'conversations'
//     });



// Users.belongsToMany(UserInfo, { through: Conversations })

export default Users