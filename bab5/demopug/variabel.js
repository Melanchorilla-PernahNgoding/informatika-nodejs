const http = require('http')
const pug = require('pug')

const server = http.createServer(function(request, response) {
	let template = pug.renderFile('./templates/variabel.pug',
		{
			data: ['JavaScript', 'Node.js', 'Express', 'Sails.js']
		}
	);

	response.end(template);
})

server.listen(3000)