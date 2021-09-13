const express = require('express');
const app = express();

const logger = require('./logger.js');

// menggunakan middleware logge
app.use(logger());

app.get('/', (request, response) => {
	response.writeHead(200, {'Content-Type': 'text/html'})
	response.end(`<h2>Demo Middleware</h2>`)
})

app.listen(3000);