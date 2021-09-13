const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://budi:1234@127.0.0.1:27017/nodebookdb';

MongoClient.connect(url, {useNewUrlParser: true}, function (error, client) {
	if(error) {
		console.log('Koneksi ke server MongoDB gagal');
		throw error;
	}

	// membuat objek dari kelas Db
	let db = client.db(client.s.options.dbName);

	let filter = {penerbit: 'PACKT'};

	// menghapus lebih dari satu dokumen
	db.collection('buku').deleteMany(filter, function (err, result) {
		if(err) throw err;
		console.log(`Beberapa dokumen di dalam koneksi telah dihapus`);

		client.close();
	})
})