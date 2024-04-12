import db from '../services/mysql.service.js'

const TABLE = 'game_histories';
const User = {

	async histories(){
		return await this.get(`Select * from ${TABLE}`);
	},
	async getResultHistory(limit, order = 'ASC'){
		return await this.get(`Select result, xu from ${TABLE} order by id ${order} limit ${limit}`);
	},
	async find(id){
		return await this.get(`select * from ${TABLE} where id=?`, [id]);
	},
	async create(histories){
		let sql = `Insert into ${TABLE} (`;
		let values = ' values (';
		let params = [];
		for (const [key, value] of Object.entries(histories)) {
			sql += `${key}, `;
			values += `?,`;
			params.push(String(value));
		}
		sql = sql.slice(0, -2); 
		values = values.slice(0, -1); 

		sql += ` )`;
		values += ` )`;

		sql += values;
		return await this.get(sql, params);
	},
	async update(histories, id){

		let sql = `update ${TABLE} set `;
		let params = [];
		for (const [key, value] of Object.entries(histories)) {
			sql += `${key}=?, `;
			params.push(String(value));
		}
		sql = sql.slice(0, -2); 

		sql += ` where id=?`;
		params.push(id);

		return await this.get(sql, params);
	},
	async count(){
		let sql = `Select count(*) as total from ${TABLE}`;
		let rs = await this.get(sql);
		return rs[0].total;
	},
	async getOldest() {
		let sql = `Select id from ${TABLE} order by id ASC LIMIT 1`;
		let rs = await this.get(sql);
		return rs[0].id;
	},
	async delete(id){
		return await this.get(`delete from ${TABLE} where id=?`, [id]);
	},
	
	async get(sql, prepare = null){
		return await new Promise((resolve, reject) => {
			db.query(sql, prepare, function (err, result, fields) {
				if (err) reject(err);
				if (result !== undefined) {
					resolve(JSON.parse(JSON.stringify(result)));
				}
			});
		});
	},
}
export default User;

