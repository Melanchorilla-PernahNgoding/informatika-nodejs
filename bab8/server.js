const http = require('http');
const mariadb = require('mariadb');
const pug = require('pug');
const qs = require('querystring');
const NodeSession = require('node-session');
const pool = mariadb.createPool({
	host: 'localhost',
	user: 'root',
	connectionLimit: 5
});

const mainPug = './templates/home.pug';
const loginFormPug = './templates/loginForm.pug';


const session = new NodeSession({
	secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'
});

const server = http.createServer(function(request, response) {

	session.startSession(request, response, function() {
		if(request.url == '/') {
			response.writeHead(200, {'Content-Type': 'text/html'});
			const template = pug.renderFile(loginFormPug);
			response.end(template);
		} else if(request.url == '/login' && request.method == 'POST') {
			let body = '';

			request.on('data', function(data) {
				body += data;
			})

			request.on('end', function() {
				let form = qs.parse(body);
				let params = [
					form['user_id'],
					form['user_password']
				];

				let sqlForm = `SELECT COUNT(*) AS cnt FROM users
					WHERE
						user_id = ? AND user_password = md5(?)
				`;

				pool.getConnection()
					.then(conn => {

						conn.query("USE nodebookdb")
							.then(rows => {
								return conn.query(sqlForm, params);
							})
							.then(res => {
								let n = res[0]['cnt'];
								console.log('Nilai n: ' + n);
								if(n > 0) {
									// login berhasil
									request.session.put('user_id', params[0]);
									// redirect ke halaman utama
									response.writeHead(302, {'Location': '/home'});
									response.end();
								} else {
									response.writeHead(200, {'Content-Type': 'text/html'});
									let template = pug.renderFile(loginFormPug, {msg: 'User ID atau password salah!'});
									response.end(template);
								}
								conn.release();
							})
							.catch(err => {
								conn.release();
							})
					}).catch(err => {
						throw err;
						console.log('Koneksi ke MariaDB gagal');
					});

			})

		} else if(request.url == '/home') {
			if(!request.session.has('user_id')) {
				// redirect ke form login
				response.writeHead(302, {'Location' : '/'});
				response.end();
			}

			var user_id = request.session.get('user_id');

			response.writeHead(200, {'Content-Type': 'text/html'});
			// menampilkan halaman utama
			let template = pug.renderFile(mainPug, {user_id: user_id});
			response.end(template);
		} else if(request.url == '/logout') {
			if(request.session.has('user_id')) {
				request.session.forget('user_id');
				// redirect ke form login
				response.writeHead(302, {'Location': '/'});
				response.end();
			}


		} else {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end('Halaman tidak ditemukan');
		}

	});
});

server.listen(3000);