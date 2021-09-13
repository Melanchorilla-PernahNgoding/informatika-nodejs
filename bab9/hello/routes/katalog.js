const express = require('express');
const router = express.Router();

router.get('/:idproduk', (request, response) => {
	let body = `
		<h2>Halaman Katalog</h2>
		<p>Produk ${request.params.idproduk}</p>
	`;

	response.send(body);
})

module.exports = router;