const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (request, response) => {
	// menampilkan index.pug
	response.render('index');
})

app.get('/hello/:name', (request, response) => {
	response.render('hello', {name: request.params.name});
})

app.listen(3000)