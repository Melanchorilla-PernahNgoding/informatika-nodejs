// https://www.npmjs.com/package/mariadb

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	connectionLimit: 5
})

let sql = `CREATE TABLE buku (
	buku_id CHAR(4) NOT NULL PRIMARY KEY,
	buku_judul VARCHAR(30),
	buku_penulis VARCHAR(25),
	buku_penerbit VARCHAR(20)
	)
`;

pool.getConnection()
	.then(conn => {

		conn.query('USE nodebookdb')
			.then(rows => {
				return conn.query(sql);
			})
			.then(res => {
				console.log('Tabel berhasil dibuat');
				console.log(res);
				conn.release();
			})
			.catch(err => {
				console.log('Tabel gagal dibuat');
				conn.release();
			})

	}).catch(err => {
		console.log("Koneksi ke MariaDB gagal")
		throw err;
	})