const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://budi:1234@127.0.0.1:27017/nodebookdb';

MongoClient.connect(url, {useNewUrlParser: true}, function(error, client) {

	if(error) {
		console.log('Koneksi ke server MongoDB gagal');
		throw error;
	}

	// membuat objek dari kelas db
	const db = client.db(client.s.options.dbName);

	var documents =[
		{kode: 'B002', judul:'Professional Node.js', penulis: 'Pedro Teixeira', penerbit: 'Wrox'},
		{kode: 'B003', judul:'Mastering MariaDB', penulis: 'Federico Razzoli', penerbit: 'PACKT Publishing'},
		{kode: 'B004', judul:'Node.js Design Patterns', penulis: 'Mario Casciaro', penerbit: 'PACKT Publishing'},
	];

	// menambah beberapa dokumen (lebih dari satu)
	db.collection('buku').insertMany(documents, function(err, result) {
		if(err) throw err;
		console.log('%d dokumen telah ditambahkan ke dalam koleksi', result.insertedCount);
		console.log('\nIsi objek result');
		console.log(result);
		
		client.close();
	});


})