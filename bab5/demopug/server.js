const http = require('http')
const pug = require('pug')

const server = http.createServer(function(request, response) {
	var data = {nama: 'Krisna Wisnu', daftar: ['satu', 'dua', 'tiga']}
	var template = pug.renderFile('./templates/index.pug', data);

	response.end(template);
})

server.listen(3000)