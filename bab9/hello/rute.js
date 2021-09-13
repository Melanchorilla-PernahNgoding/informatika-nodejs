const express = require('express');
const app = express();

app.get('/', (request, response) => {
	let body = `
		<h2>Halaman Utama</h2>
		<a href="http://localhost:3000/katalog">Katalog</a>
		<a href="http://localhost:3000/kontak">Kontak</a>
		<a href="http://localhost:3000/tidak-di-kenal">Rute lain</a>
	`;

	response.send(body);
});


app.get('/katalog', (request, response) => {
	response.send(`<h2>Halaman Katalog</h2>`);
})


app.get('/kontak', (request, response) => {
	response.send(`<h2>Halaman Kontak</h2>`);
})


app.get('*', (request, response) => {
	response.send(`<h2>404: Halaman tidak ditemukan</h2>`);
})

app.listen(3000);