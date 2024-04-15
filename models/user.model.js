import db from '../services/mysql.service.js'

const TABLE = 'users';
const User = {

	async users(){
		return await this.get(`Select * from ${TABLE}`);
	},
	async find(id){
		return await this.get(`select * from ${TABLE} where id=?`, [id]);
	},
	async findByEmail(email){
		return await this.get(`select * from ${TABLE} where email=?`, [email]);
	},
	async findByUsername(username){
		return await this.get(`select * from ${TABLE} where username=?`, [username]);
	},
	async create(user){
		return await this.get(`Insert into ${TABLE}(username,nickname,secret_code,email,password) values(?,?,?,?,?)`,[user.username, user.nickname, user.secretCode,user.email, user.password]);
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

