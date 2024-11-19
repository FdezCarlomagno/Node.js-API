const mysql = require('mysql2/promise');
require('dotenv').config();

const env = process.env;

const pool = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME
})

class PaintingModel {
    async getPaintings(sold, price, name) {
        let sql = this.getQuery(sold, price, name);
        const [rows] = await pool.query(sql);
        return rows;
    }

    getQuery(sold, price, name){
        let baseQuery = "SELECT * FROM paintings";
        let conditions = [];
        let orderBy = "";

        if(sold === 'false'){
            conditions.push(
                'sold = 0'
            )
        } else if (sold === 'true'){
            conditions.push(
                "sold = 1"
            );
        }

        if(price === 'asc'){
            orderBy = ' ORDER BY price ASC';
        } else if (price === 'desc'){
            orderBy = ' ORDER BY price DESC';
        }

        if(name === 'asc'){
            orderBy = ' ORDER BY name ASC';
        } else if (name === 'desc'){
            orderBy = ' ORDER BY name DESC';
        }

        if(conditions.length > 0){
            baseQuery += ' WHERE ' + conditions.join(' AND ');
        }

        if (orderBy) {
            baseQuery += " " + orderBy;
        }
        return baseQuery;
    }
    async getPaintingByID(id) {
        const [rows] = await pool.query("SELECT * FROM paintings WHERE id = ?", [id]);
        
        return rows[0];
    }
    async addPainting(name, image_url, price, description,  sold, height, width, discount) {
        const result = await pool.query("INSERT INTO paintings (name, image_url, price, description, sold, height, width, discount) VALUES(?,?,?,?,?,?,?,?)", [name, image_url, price, description, sold, height, width, discount]);    

        return result.insertId;
    }
    async deletePainting(id) {
        await pool.query("DELETE FROM paintings WHERE id = ?", [id]);
    }
    async updatePainting(id, name, image_url, price, description,  sold, height, width, discount){
        const query = "UPDATE paintings SET name = ?, image_url = ?, price = ?, description = ?, sold = ?, height = ?, width = ?, discount = ? WHERE id = ?";
        await pool.query(query, [name, image_url, price, description,  sold, height, width, discount, id]);
    }
}

module.exports = new PaintingModel();