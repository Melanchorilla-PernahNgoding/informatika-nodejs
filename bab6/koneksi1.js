// https://www.npmjs.com/package/mariadb

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	connectionLimit: 5
})

pool.getConnection()
	.then(conn => {

		conn.query('SHOW DATABASES')
			.then(rows => {
				return conn.query('SHOW DATABASES')
			})
			.then(res => {
				console.log(res);
				conn.release();
			})
			.catch(err => {
				conn.release();
			})
	}).catch(err => {
		console.log('Koneksi ke server MariaDB gagal');
	})