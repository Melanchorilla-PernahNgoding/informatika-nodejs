const http = require('http')
const pug = require('pug')
const qs = require('querystring')

const server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'})

	if(request.url == '/') {
		switch(request.method) {
			case 'GET':
				const template = pug.renderFile('./templates/interpolasi-form.pug');

				response.end(template);
				break;

			case 'POST':
				let body = '';

				request.on('data', function(data) {
					body += data;
				})

				request.on('end', function() {
					const form = qs.parse(body);
					const template = pug.renderFile('./templates/interpolasi.pug', {nama: form['nama']});
					response.end(template)
				})
				break;

			default:
			response.end('Metode pengiriman tidak dikenal');
		}
	}
})

server.listen(3000)