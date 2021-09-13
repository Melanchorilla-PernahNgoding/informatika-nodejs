const http = require('http');
const mariadb = require('mariadb');
const pug = require('pug');
const qs = require('querystring');
const url = require('url');

const listPug = './templates/list.pug';
const addFormPug = './templates/addForm.pug';
const editFormPug = './templates/editForm.pug';

const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	connectionLimit: 5
})

const server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});

	if(request.url == '/') {
		pool.getConnection()
			.then(conn => {

				conn.query("USE nodebookdb")
					.then(rows => {
						return conn.query("SELECT * FROM buku");
					})
					.then(res => {
						let template = pug.renderFile(listPug, {books: res});
						response.end(template);
						conn.release();
					})
					.catch(err => {
						throw err;
						conn.release();
					})
			}).catch(err => {
				console.log("Koneksi ke MariaDB gagal");
			})
	} else if(request.url == '/add') {
		switch(request.method) {
			case 'GET':
				let template = pug.renderFile(addFormPug);
				response.end(template);
			break;

			case 'POST':
				let body = '';

				request.on('data', function(data) {
					body += data;
				})


				request.on('end', function() {
					let form = qs.parse(body);
					let newRow = [
						form['buku_id'],
						form['buku_judul'],
						form['buku_penulis'],
						form['buku_penerbit']
					];

					pool.getConnection()
						.then(conn => {

							conn.query("USE nodebookdb")
								.then(rows => {
									return conn.query("INSERT INTO buku VALUE (?, ?, ?, ?)", newRow);
								})
								.then(res => {
									response.writeHead(302, {'Location': '/'});
									response.end();
									conn.release();
								})
								.catch(err => {
									conn.release();
								})
						}).catch(err => {
							throw err;
							console.log("Koneksi ke MariaDB gagal")
						})

				})

			break;
		}
	} else if(url.parse(request.url).pathname == '/edit') {
		switch(request.method) {
			case 'GET':
				let id = qs.parse(url.parse(request.url).query).id;
				let sqlSelect = 'SELECT * FROM buku WHERE buku_id = ?';
				
				pool.getConnection()
					.then(conn => {

						conn.query("USE nodebookdb")
							.then(rows => {
								return conn.query(sqlSelect, [id]);
							})
							.then(res => {
								let template = pug.renderFile(editFormPug, {book: res[0]});
								response.end(template);
								conn.release();
							})
							.catch(err => {
								throw err;
								conn.release();
							})
					}).catch(err => {
						throw err;
						console.log("Koneksi ke MariaDB gagal");
					})
			break;
			case 'POST':
				let body = '';

				request.on('data', function(data) {
					body += data;
				});

				request.on('end', function() {
					let form = qs.parse(body);
					let params = [
						form['buku_judul'],
						form['buku_penulis'],
						form['buku_penerbit'],
						form['buku_id']
					];

					let sqlUpdate = `UPDATE buku SET
						buku_judul = ?,
						buku_penulis = ?,
						buku_penerbit = ?
						WHERE buku_id = ?
					`;

					pool.getConnection()
						.then(conn => {

							conn.query("USE nodebookdb")
								.then(rows => {
									return conn.query(sqlUpdate, params)
								})
								.then(res => {
									response.writeHead(302, {'Location': '/'});
									response.end();
									conn.release();
								})
								.catch(err => {
									conn.release();
								})
						}).catch(err => {
							throw err;
							console.log("Koneksi ke MariaDB gagal");
						})

				});
				
			break;

		}
	} else if(url.parse(request.url).pathname == '/delete') {
		// mengambil dari parameter id
		const id = qs.parse(url.parse(request.url).query).id;
		const sqlDelete = ` DELETE FROM buku WHERE buku_id = ?`;

		pool.getConnection()
			.then(conn => {

				conn.query("USE nodebookdb")
					.then(rows => {
						return conn.query(sqlDelete, [id]);
					})
					.then(res => {
						response.writeHead(302, {'Location': '/'});
						response.end();
						conn.release();
					})
					.catch(err => {
						throw err;
						console.release();
					})
			}).catch(err => {
				throw err;
				console.log("Koneksi ke MariaDB gagal");
			});
	}
})

server.listen(3000);
console.log("Server aktif di http://localhost:3000");