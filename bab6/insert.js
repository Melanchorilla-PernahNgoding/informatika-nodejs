// https://www.npmjs.com/package/mariadb

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	connectionLimit: 5
})

async function insert() {
	let conn;
	try {
		conn = await pool.getConnection();
		const rows = await conn.query("USE nodebookdb");

		const res = await conn.query("INSERT INTO buku VALUES('B099', 'Practical PHP', 'Dicky K', 'Nowhere')");
		if(res) {
			console.log("Penambahan data berhasil");
		}
	} catch(err) {
		console.log("Penambahan data gagal");
		throw err;
	} finally {
		if(conn) conn.release();
	}
}

insert();
