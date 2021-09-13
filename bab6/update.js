// https://www.npmjs.com/package/mariadb

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	connectionLimit: 5
})

async function update() {
	let conn;
	try {
		conn = await pool.getConnection();
		const rows = await conn.query(`USE nodebookdb`);

		const res = await conn.query(`UPDATE buku SET
			buku_judul = 'Professional Node.js',
			buku_penulis = 'Pedro Teixeira',
			buku_penerbit = 'Wrox'
			WHERE buku_id = 'B002'
		`);

		if(res) {
			console.log('Perubahan data berhasil');
		} else {
			console.log('Perubahan data gagal');
		}

	} catch (err) {
		throw err;
	} finally {
		if (conn) conn.release();
	}
}

update();