const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://budi:1234@127.0.0.1:27017/nodebookdb';

MongoClient.connect(url, {useNewUrlParser: true}, function (error, client) {
	if(error) {
		console.log('Koneksi ke server MongoDB gagal');
		throw error;
	}

	// membuat objek dari kelas db
	const db = client.db(client.s.options.dbName);

	let filter = {kode: 'B003'};
	let newValue = {
		$set: {
			judul: 'Mastering MongoDB',
			penulis: 'Alex Giamas'
		}
	};

	// mengubah satu dokumen
	db.collection('buku').updateOne(filter, newValue, function(err, result) {
		if(err) throw err;
		console.log('1 dokumen di dalam koleksi telah diubah');

		client.close();
	});
});