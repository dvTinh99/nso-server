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
	async create(user){
		return await this.get(`Insert into ${TABLE}(name,email,password) values(?,?,?)`,[user.name, user.email, user.password]);
	},
	// delete(id,callback){
	// 	return db.query(`delete from ${TABLE} where Id=?`,[id],callback);
	// },
	// update(id,sinhvien,callback){
	// 	return db.query(`update ${TABLE} set name=?,class=?,dob=? where Id=?`,[sinhvien.name,sinhvien.class,sinhvien.dob,id],callback);
	// },
	
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

