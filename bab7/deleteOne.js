const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://budi:1234@127.0.0.1:27017/nodebookdb';

MongoClient.connect(url, {useNewUrlParser:true}, function(error, client) {
	if(error) {
		console.log('Koneksi ke server MongoDB gagal');
		throw error;
	}

	// membuat objek dari kelas db
	const db = client.db(client.s.options.dbName);

	let filter = {kode: 'B002'};

	// menghapus satu dokumen
	db.collection('buku').deleteOne(filter, function(err, result) {
		if(err) throw err;
		console.log('1 dokumen di dalam koleksi telah dihapus');

		client.close();
	});
});