const http = require('http');
const fs = require('fs');
const formidable = require('formidable');

const html = fs.readFileSync('./uploadform.html');

const server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});

	if(request.method == 'GET') {
		response.end(html);
	}
	else if(request.method == 'POST') {
		// membuat objek dari kelas formidable.IncomingForm
		let form = new formidable.IncomingForm();

		form.parse(request, function(err, fields, files){
			// mengambil nama file temporary
			let tempFile = files.userfile.path;

			// menentukan tujuan upload
			let destFile = './uploads/' + files.userfile.name;

			// memindahkan file temporary ke tujuan upload
			fs.rename(tempFile, destFile, function(error) {
				if(error) {
					response.end('Proses upload gagal!');
					throw error;
				}

				response.end('Proses upload berhasil');
			})
		})
	}
})

server.listen(3000)