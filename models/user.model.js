import db from '../services/mysql.service.js'

const TABLE = 'users';
const User = {

	users(callback){
		db.query(`Select * from ${TABLE}`, callback);
	},
	find(id,callback){
		return db.query(`select * from ${TABLE} where Id=?`,[id],callback);
	},
	add(sinhvien,callback){
		return db.query(`Insert into ${TABLE}(name,class,dob) values(?,?,?)`,[sinhvien.name,sinhvien.class,sinhvien.dob],callback);
	},
	delete(id,callback){
		return db.query(`delete from ${TABLE} where Id=?`,[id],callback);
	},
	update(id,sinhvien,callback){
		return db.query(`update ${TABLE} set name=?,class=?,dob=? where Id=?`,[sinhvien.name,sinhvien.class,sinhvien.dob,id],callback);
	}
}
export default User;

