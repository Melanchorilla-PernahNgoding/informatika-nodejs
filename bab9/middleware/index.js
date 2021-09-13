const express = require('express');
const app = express();

// membuat middleware
const logger = (request, response, next) => {
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1;
	let yyyy = today.getFullYear();

	let hh = today.getHours();
	let nn = today.getMinutes();
	let ss = today.getSeconds();

	if (dd < 10) dd = `0${dd}`;
	if (mm < 10) mm = `0${mm}`;
	if (hh < 10) hh = `0${hh}`;
	if (nn < 10) nn = `0${nn}`;
	if (ss < 10) ss = `0${ss}`;

	let date = `${dd}/${mm}/${yyyy}`;
	let time = `${hh}:${nn}:${ss}`;

	console.log(`Terjadi permintaan GET / pada ${date} ${time}`);
	next();
}


// menggunakan middleware logger
app.use(logger);

app.get('/', (request, response) => {
	response.writeHead(200, {'Content-Type': 'text/html'})
	response.end(`<h2>Demo Middleware</h2>`)
})

app.listen(3000);