const http = require('http');
const qs  = require('querystring');

const server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type' : 'text/html'});

	if(request.url == '/') {
		switch(request.method) {
			case 'GET':
				response.end(
					`<h2>Demo penanganan form</h2>
						<form action="/" method="post">
							Nama: <br>
							<input type="text" name="nama"><br><br>
							Email: <br>
							<input type="email" name="email"><br><br>
							<input type="submit" name="btnSubmit" value="Kirim"><br><br>
						</form>

					`
				);
			break;

			case 'POST':
				let body = '';

				request.on('data', function(data) {
					body += data;
				})

				request.on('end', function() {
					let form = qs.parse(body);
					response.end(
						`
						Data yang dikirim: <br>
						Nama: ${form['nama']} <br>
						Email: ${form['email']}
						`
					);
				});
			break;

			default:
			response.end(`Metode pengiriman tidak dikenal`);
		}
	}
})

server.listen(3000);