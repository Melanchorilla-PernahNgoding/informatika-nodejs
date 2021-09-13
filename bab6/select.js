// https://www.npmjs.com/package/mariadb

const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	connectionLimit: 5
});

async function selectRow() {
	let conn;
	try {
		conn = await pool.getConnection();
		const rows = await conn.query(`USE nodebookdb`);

		const res = await conn.query(`SELECT * FROM buku`);

		if(res) {
			for(let i = 0; i < res.length; i++) {
				let row = res[i];

				console.log('%s, %s, %s, %s,', 
					row['buku_id'],
					row['buku_judul'],
					row['buku_penulis'],
					row['buku_penerbit'],
				);
			}

		}

	} catch (err) {
		throw err;
	} finally {
		if(conn) conn.release();
	}
}

selectRow();