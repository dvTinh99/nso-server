import db from '../services/mysql.service.js'

const TABLE = 'bots';
const Bot = {

	async bots(){
		return await this.get(`Select * from ${TABLE}`);
	},
	async find(id){
		return await this.get(`select * from ${TABLE} where id=?`, [id]);
	},
	async create(bot){
		return await this.get(`Insert into ${TABLE}(name,location,status) values(?,?,?)`,[bot.name, bot.location, bot.status || 1]);
	},
	async delete(id){
		return await this.get(`delete from ${TABLE} where id=?`,[id]);
	},
	async update(bot, id){

		let sql = `update ${TABLE} set `;
		let params = [];
		for (const [key, value] of Object.entries(bot)) {
			sql += `${key}=?, `;
			params.push(String(value));
		}
		sql = sql.slice(0, -2); 

		sql += ` where id=?`;
		params.push(id);

		return await this.get(sql, params);
	},
	
	async get(sql, prepare = null){
		return await new Promise((resolve, reject) => {
			db.query(sql, prepare, function (err, result, fields) {
				if (err) reject(err);
				// console.log('result', result);
				if (result !== undefined) {
					resolve(JSON.parse(JSON.stringify(result)));
				}
			});
		});
	},
}
export default Bot;

