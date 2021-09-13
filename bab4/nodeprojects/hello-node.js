var http = require('http');

http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write('<h1>Hello Node.js</h1>');
	response.end(console.log('Server berjalan pada port:3000'));
}).listen(3000);
