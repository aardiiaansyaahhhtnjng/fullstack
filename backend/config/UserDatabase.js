import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306 // port default MySQL
});

export default db;
