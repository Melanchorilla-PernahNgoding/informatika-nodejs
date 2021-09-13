const http = require('http');
const fs = require('fs');

const html = fs.readFileSync('./index.html');

const server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type' : 'text/html'});
	response.end(html)
})

server.listen(3000)