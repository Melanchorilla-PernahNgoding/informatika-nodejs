var http = require('http');

var server = http.createServer(function(request, response) {
	if(request.url == '/') 
	{
		response.writeHead(200, {'Content-Type': 'text/html'})
		response.end('<h2>Halaman Utama</h2>');
	} else if(request.url == '/katalog') 
	{
		response.writeHead(200, {'Content-Type': 'text/html'})
		response.end('<h2>Halaman Katalog</h2>');
	} else if(request.url == '/kontak') {
		response.writeHead(200, {'Content-Type': 'text/html'})
		response.end('<h2>Halaman Kontak</h2>');
	} else {
		response.writeHead(404, {'Content-Type': 'text/html'})
		response.end('<h2>404: Halaman tidak ditemukan</h2>');
	}
})

server.listen(3000);