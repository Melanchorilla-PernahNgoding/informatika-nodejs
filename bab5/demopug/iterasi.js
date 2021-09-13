const http = require('http');
const pug = require('pug');
const qs = require('querystring');

const server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'})

	var data = [
		['PRD001', 'Pensil', '6000'],
		['PRD002', 'Spidol', '8500'],
		['PRD003', 'Stabilo', '12000'],
	]

	const template = pug.renderFile('./templates/iterasi.pug', {produk: data});

	response.end(template)
})

server.listen(3000)