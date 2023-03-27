import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize (
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        dialect : 'postgres'
    }
)


// const db1 = knex({
//     client:'postgres',
//     connection : {
//         host : process.env.DB_HOST,
//         port : process.env.DB_PORT,
//         user : process.env.DB_USER,
//         password : process.env.DB_PASS,
//         database : process.env.DB_NAME
//     }
// });

export default db;