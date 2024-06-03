const mysql = require('mysql2');

const db = {
    host:'localhost',
    user:"root",
    password:"root",
    database:"gymproject"
};

const connection = mysql.createConnection(db);

connection.connect((err) => {
    if (err) throw err;
    console.log('Database connected!');
});

module.exports = connection;