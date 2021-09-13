// https://www.npmjs.com/package/mariadb

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	connectionLimit: 5
})

pool.getConnection()
	.then(conn => {

		conn.query("USE mysql")
			.then(rows => {
				return conn.query("SHOW TABLES");
			})
			.then(res => {
				console.log(res);
				conn.release();
			})
			.catch(err => {
				conn.release();
			})
	}).catch(err => {
		console.log('Koneksi ke MariaDB gagal');
	})