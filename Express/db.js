const mysql = require('mysql2/promise');

let db;

async function connect (callback){
    const connection = await mysql.createConnection({
        host: "us-cdbr-iron-east-05.cleardb.net",
        user: "b4a1d35a095604",
        password: "ba05a6bb",
        database: "heroku_78346a1f5e165de"
    });
    db = connection;
    if(callback) callback();
}

async function query(query, callback) {
    db.query(query, callback)
}

module.exports = { connect, query };