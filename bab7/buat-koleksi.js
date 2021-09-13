let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://budi:1234@127.0.0.1:27017/nodebookdb';

MongoClient.connect(url, {useNewUrlParser: true}, function(error, client) {
	if(error) {
		console.log('Koneksi ke server MongoDB gagal');
		throw error;
	}

	// membuat objek dari kelas db
	let db = client.db(client.s.options.dbName);

	// membuat koleksi dengan nama buku
	db.createCollection('buku', function(err, result) {
		if(err) {
			console.log('Koleksi buku gagal dibuat');
			throw err;
		}
		console.log('Koleksi buku berhasil dibuat');
		client.close();
	});

});