// https://www.npmjs.com/package/mariadb

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	connectionLimit: 5
});

async function deleteData() {
	let conn;
	try {
		conn = await pool.getConnection();
		const rows = await conn.query("USE nodebookdb");

		const res = await conn.query(`DELETE FROM buku WHERE buku_id = 'B099'`);

		if(res) {
			console.log("Data berhasil dihapus");
		} else {
			console.log("Data gagal dihapus");
		}
	} catch (err) {
		throw err;
	} finally {
		if(conn) conn.release();
	}
}


deleteData();