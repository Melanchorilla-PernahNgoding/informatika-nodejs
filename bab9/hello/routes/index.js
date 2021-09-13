const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
	let body = `
		<h2>Halaman Utama</h2>
		<a href="http://localhost:3000/katalog/123">Produk 123</a>
		<a href="http://localhost:3000/katalog/456">Produk 456</a>
		<a href="http://localhost:3000/tidak-di-kenal">Rute lain</a>
	`;

	response.send(body);
})

module.exports = router;