const http = require('http');
const fs = require('fs');


function css(request, response) {
	if(request.url === '/style.css') {
		response.writeHead(200, {'Content-Type' : 'text/css'});

		const fileContents = fs.readFileSync('./style.css', {encoding: 'utf8'});

		response.write(fileContents);
		response.end();
	}
}

function renderHtml(path, response) {
	fs.readFile(path, null, function (error,data) {
		if (error) {
			response.writeHead(404);
			reponse.write('File tidak ditemukan');
		}
		else {
			response.write(data);
		}
		response.end();
	})
}

const server = http.createServer(function (request, response) {
	css(request,response);
	response.writeHead(200, {'Content-Type': 'text/html'});
	renderHtml('./index.html', response);
})

server.listen(3000)