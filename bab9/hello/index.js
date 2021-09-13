var express = require('express');
var app = express();

app.get('/', (request, response) => {
	response.send('<h2>Hello Express!</h2>');
});

app.listen(3000);