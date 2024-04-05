// import { Sequelize } from "sequelize";
// import db from '../config/database.js';
// import Users from "./UsersModels.js";
// import UserInfo from "./UsersInfoModel.js";

// const {DataTypes} = Sequelize;

// const Conversations = db.define("conversations",{
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


// export default Conversations

import { Sequelize } from "sequelize";
import db from '../config/database.js';
import UserInfo from "./UsersInfoModel.js";


const {DataTypes} = Sequelize;

// const Conversations = db.define("conversations",{
//     user1_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       user2_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       }
//     }, {
//         timestamps : false,
//         freezeTableName : true,
//         tableName : 'conversations'
//     });


// export default Conversations


// export const Conversations = db.define('conversations', {
//   sender_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'users_info',
//       key: 'user_id'
//     },
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//     validate: {
//       notEqualUser2(value) {
//         if (value === this.user2_id) {
//           throw new Error('User1_id and User2_id cannot be equal');
//         }
//       }
//     }
//   },
//   receiver_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'users_info',
//       key: 'user_id'
//     },
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//     validate: {
//       notEqualUser1(value) {
//         if (value === this.user1_id) {
//           throw new Error('User1_id and User2_id cannot be equal');
//         }
//       }
//     }
//   }
// },
// {
//     timestamps : false,
//     freezeTableName : true,
//     tableName : 'conversations'
// });
export const Conversations = db.define('conversations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  sender_id: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    references: {
      model: UserInfo,
      key: 'user_id',
    },
    allowNull: false,
    validate: {
      notEmpty: true,
      notEqualUser2(value) {
        if (value === this.receiver_id) {
          throw new Error("You can't create conversation with yourself");
        }
      }
    }
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    references: {
      model: UserInfo,
      key: 'user_id',
    },
    allowNull: false,
    validate: {
      notEmpty: true,
      notEqualUser1(value) {
        if (value === this.sender_id) {
          throw new Error("You can't create conversation with yourself");
        }
      }
    }
  }
},
{
    timestamps : false,
    freezeTableName : true,
    tableName : 'conversations'
});
// Conversations.removeAttribute('id')

export const Messages = db.define("messages",{
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
      defaultValue: false,
  },
  is_read :{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    validate: {
        notEmpty: true
    }
  }


},{  timestamps : false,
  freezeTableName : true,
  tableName : 'messages'
})

Conversations.belongsTo(UserInfo, {
  foreignKey: 'sender_id',
  as: 'sender_info'
});

Conversations.belongsTo(UserInfo, {
  foreignKey: 'receiver_id',
  as: 'receiver_info'
});
// Synchronize the model with the database
// db.sync();

// export default Conversations
