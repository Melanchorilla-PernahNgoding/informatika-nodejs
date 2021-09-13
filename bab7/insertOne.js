const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://budi:1234@127.0.0.1:27017/nodebookdb';

MongoClient.connect(url, {useNewUrlParser: true}, function(error, client) {
	if(error){
		console.log('Koneksi ke server MongoDB gagal');
		throw error;
	}

	// membuat objek dari kelas Db
	const db = client.db(client.s.options.dbName);
	
	let document = {
		kode: 'B001', judul: 'Practical Node.js',
		penulis: 'Azat Mardan', penerbit: 'Apress'
	};

	// menambah dokumen
	db.collection('buku').insertOne(document, function(err, result) {
		if(err) throw err;
		console.log('1 dokumen telah ditambahkan ke dalam koleksi');
		client.close();
	})


})