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
		return await this.get(`Insert into ${TABLE}(name,location,status) values(?,?,?)`,[bot.name, bot.location, bot.status]);
	},
	async delete(id){
		return await this.get(`delete from ${TABLE} where Id=?`,[id]);
	},
	async update(bot){
		return await this.get(`update ${TABLE} set name=?,location=?,status=? where Id=?`,[bot.name,bot.location,bot.status,bot.id]);
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

