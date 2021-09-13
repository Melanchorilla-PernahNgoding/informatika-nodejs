const express = require('express');
const router = express.Router();

router.get('*', (request, response) => {

	response.send(`<h2>404: Halaman tidak ditemukan</h2>`);
})

module.exports = router;