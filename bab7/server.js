const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const pug = require('pug');
const qs = require('querystring');
const url = require('url');

const listPug = './templates/list.pug';
const addFormPug = './templates/addForm.pug';
const editFormPug = './templates/editForm.pug';

const connectionString = 'mongodb://budi:1234@127.0.0.1:27017/nodebookdb';
const connectionOption = {useNewUrlParser: true};

MongoClient.connect(connectionString, connectionOption, function(dbConnectionError, client) {
	if(dbConnectionError) throw dbConnectionError;

	const db = client.db(client.s.options.dbName);

	const server = http.createServer(function(request, response) {
		response.writeHead(200, {'Content-Type': 'text/html'});

		if(request.url == '/') {
			db.collection('buku').find().toArray(function(error, result) {
				if(error) throw error;
				const template = pug.renderFile(listPug, {books: result});
				response.end(template);
			})
		} else if(request.url == '/add'){
			switch(request.method) {
				case 'GET':
					const template = pug.renderFile(addFormPug);
					response.end(template);
				break;

				case 'POST':
					let body = '';

					request.on('data', function(data) {
						body += data;
					})


					request.on('end', function() {
						const form = qs.parse(body);

						const newDocument = {
							kode: form['buku_id'],
							judul: form['buku_judul'],
							penulis: form['buku_penulis'],
							penerbit: form['buku_penerbit'],
						}

						db.collection('buku').insertOne(newDocument, function(error, result) {
							if(error) throw error;
							// kode untuk redirect ke root document
							response.writeHead(302, {'Location': '/'});
							response.end();
						})

					})

				break;
			}
		} else if(url.parse(request.url).pathname == '/edit') {
			switch(request.method) {
				case 'GET':
					const id = qs.parse(url.parse(request.url).query).id;
					const filter = {kode: id};

					db.collection('buku').find(filter).toArray(function (error, result) {
						if(error) throw error;
						const template = pug.renderFile(editFormPug, {book: result[0]});

						response.end(template);
					})
				break;

				case 'POST':
					let body = '';

					request.on('data', function(data) {
						body += data;
					})

					request.on('end', function() {
						const form = qs.parse(body);
						const filter = {kode: form['buku_id']};
						const newValue = {
							$set: {
								judul: form['buku_judul'],
								penulis: form['buku_penulis'],
								penerbit: form['buku_penerbit']
							}
						}


						db.collection('buku').updateOne(filter, newValue, function(error, result) {
							if(error) throw error;
							// kode untuk rediect ke root document
							response.writeHead(302, {'Location': '/'});
							response.end();
						})

					})
				break;
			}
		} else if(url.parse(request.url).pathname == '/delete') {
			// mengambil nilai dari parameter id
			const id = qs.parse(url.parse(request.url).query).id;
			const filter = {kode: id};

			db.collection('buku').deleteOne(filter, function(error, result) {
				if(error) throw error;
				// kode untuk redirect ke root document
				response.writeHead(302, {'Location': '/'});
				response.end();
			})
		}

	})

	server.listen(3000);
	console.log('Server aktif di http://localhost:3000');
})