const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (request, response) => {
	// menampilkan index.pug
	response.render('index');
})

// penanganan form
app.post('/', (request, response) => {
	// mengambil data yang dikirim melalui form
	let nama = request.body.nama;

	// menampilkan hello.pug
	response.render('hello', {nama: nama});
})


app.listen(3000)

