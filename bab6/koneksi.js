// https://www.npmjs.com/package/mariadb

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	connectionLimit: 5
});

pool.getConnection()
	.then(conn => {
		console.log('Koneksi ke server MariaDB berhasil');
	}).catch(err => {
		console.log('Koneksi ke server MariaDB gagal');
		throw err;
	});