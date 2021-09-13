const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://budi:1234@127.0.0.1:27017/nodebookdb';


MongoClient.connect(url, {useNewUrlParser: true}, function(error, client) {
	if(error) {
		console.log('Koneksi ke server MongoDB gagal');
		throw error;
	}

	// membuat objek dari kelas db
	let db = client.db(client.s.options.dbName);

	// seleksi seluruh dokumen
	db.collection('buku').find().toArray(function (err, result) {
		if(err) throw err;
		console.log(result);

		client.close();
	})
})