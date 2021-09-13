const http = require('http');
const pug = require('pug');
const NodeSession = require('node-session');

const mainPug = './templates/main.pug';
const page1Pug = './templates/page1.pug';
const page2Pug = './templates/page2.pug';

// membuat session
let session = new NodeSession({
	secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'
});

const server = http.createServer(function(request, response) {
	// mengaktifkan session
	session.startSession(request, response, function(){
		response.writeHead(200, {'Content-Type': 'text/html'});

		if(request.url == '/') {
			// mendaftarkan variabel ke dalam session
			request.session.put('var1', 'Pemrograman Node.js');

			// menampilkan halaman utama
			const template = pug.renderFile(mainPug);
			response.end(template);
		} else if(request.url == '/page1') {
			// mengambil nilai variabel dari dalam session dari halaman 1
			const value = request.session.get('var1');

			// menampilkan halaman 1
			const template = pug.renderFile(page1Pug, {var1: value});
			response.end(template);
		} else if(request.url == '/page2') {
			// mengambil nilai variabel dari dalam session dari halaman 2
			const value = request.session.get('var1');

			// menampilkan halaman 2
			const template = pug.renderFile(page2Pug, {var1: value});
			response.end(template);
		} else {
			response.end('Halaman tidak ditemukan');
		}


	})
})

server.listen(3000)