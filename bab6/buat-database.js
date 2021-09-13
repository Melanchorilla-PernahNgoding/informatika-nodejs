// https://www.npmjs.com/package/mariadb

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	connectionLimit: 5
})


pool.getConnection()
	.then(conn => {
		conn.query('CREATE DATABASE nodebookdb')
			.then(rows => {
				console.log(rows);
			})
			.then(res => {
				console.log('Database nodebookdb berhasil dibuat');
				conn.release();
			})
			.catch(err => {
				console.log('Database nodebookdb gagal dibuat');
				conn.release();
			})
	}).catch(err => {
		console.log('Koneksi ke MariaDB Gagal');
		throw err;
	})