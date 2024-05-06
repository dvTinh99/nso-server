import db from '../services/mysql.service.js'

const TABLE = 'games';
const User = {

	async games(){
		return await this.get(`Select * from ${TABLE}`);
	},
	async find(id){
		return await this.get(`select * from ${TABLE} where id=?`, [id]);
	},
	async findBySpinCode(id){
		return await this.get(`select * from ${TABLE} where spin_code=?`, [id]);
	},
	async create(game){
		return await this.get(`Insert into ${TABLE}(user_id,spin_code,xu,bet) values(?,?,?,?)`,[game.user_id, game.spin_code, game.xu,game.bet]);
	},
	
	async update(user, id){

		let sql = `update ${TABLE} set `;
		let params = [];
		for (const [key, value] of Object.entries(user)) {
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
				if (result !== undefined)
					resolve(JSON.parse(JSON.stringify(result)));
			});
		});
	},
}
export default User;

