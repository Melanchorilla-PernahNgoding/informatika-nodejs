const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', (request, response) => {
	// menampilkan index.pug
	response.render('index');
})

app.listen(3000)