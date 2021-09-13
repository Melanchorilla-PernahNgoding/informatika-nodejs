const express = require('express');
const app = express();

app.get('/', (request, response) => {
	let body = `
		<h2>Halaman Utama</h2>
		<a href="http://localhost:3000/katalog/123">Produk 123</a> |
		<a href="http://localhost:3000/katalog/456">Produk 456</a> |
		<a href="http://localhost:3000/tidak-di-kenal">Rute lain</a>
	`;

	response.send(body);
});


app.get('/katalog/:idproduk', (request, response) => {

	let body = `
		<h2>Halaman Katalog</h2>
		<p>Produk ${request.params.idproduk}</p>
	`

	response.send(body);

})


app.get('*', (request, response) => {
	response.send(`<h2>404: Halaman tidak ditemukan</h2>`);

})

app.listen(3000);