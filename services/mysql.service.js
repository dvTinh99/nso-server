import env from 'dotenv';
env.config();
import mysql from 'mysql';

var con = mysql.createPool({
    connectionLimit : 10,

    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB
});

export default con;