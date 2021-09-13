let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://budi:1234@127.0.0.1:27017/nodebookdb';

MongoClient.connect(url, {useNewUrlParser: true}, function(error, client) {
	if(error) {
		console.log('Koneksi ke server MongoDB gagal');
		throw error;
	}

	console.log('Koneksi ke server MongoDB berhasil \n');
	console.log(`url\t\t: ${client.s.url}`);
	console.log(`host\t\t: ${client.topology.s.host}`);
	console.log(`port\t\t: ${client.topology.s.port}`);
	console.log(`user\t\t: ${client.s.options.username}`);
	console.log(`password\t\t: ${client.s.options.password}`);
	console.log(`database\t\t: ${client.s.options.dbName}`);

	client.close();
})