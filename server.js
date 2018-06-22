const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3002;
MongoClient.connect(db.url, (err, db) => {
    if (err) return console.log(err)
    let database = db.db(db.db_name);
    require('./app/routes')(app, database);
    app.listen(port, () => console.log(`Listening on port ${port} ...!!!`));
})