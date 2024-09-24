// // import { Sequelize } from "sequelize"
// import mysql from "mysql2/promise";

// // const db = new Sequelize('crud_db', 'root', '4Bersaudara_', {
// //     host: '172.17.0.3',
// //     dialect: 'mysql',
// //     port: 1122
// // });

// const db = mysql.createPool({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     host: process.env.DB_HOST
// }); 

// export default db;

import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306 // port default MySQL
});

export default db;
