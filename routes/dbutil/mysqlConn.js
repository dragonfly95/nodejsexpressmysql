//   MySQL 로드
// var mysql = require('mysql');

const mysql = require('mysql2/promise');

var pool = mysql.createPool({
    connectionLimit: 5,
        waitForConnections:false,
    multipleStatements: true,
    host     : 'localhost',
    user     : 'root',
    password : '1q2w3e4r5t',
    database : 'pbstore'    
});



module.exports = pool;