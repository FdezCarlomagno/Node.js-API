const mysql = require('mysql2/promise');
require('dotenv').config();

const env = process.env;

const pool = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME
})

class UserModel {
    async getUserByNickname(nickname){
        const [rows] = await pool.query("SELECT * FROM user WHERE nickname = ?", [nickname]);
        return rows[0];
    }
}

module.exports = new UserModel();