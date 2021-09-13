const express = require('express');
const app = express();

const index = require('./routes/index.js');
const katalog = require('./routes/katalog.js');
const notfound = require('./routes/notfound.js');

app.use('/', index);
app.use('/katalog', katalog);
app.use('*', notfound);

app.listen(3000);
