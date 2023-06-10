const mysql = require('mysql2');

const init = () => {
    console.log('Making Database Pool Connection');
    global.pool = mysql.createPool({
        host: process.env.DATABASE_DB_HOST,
        user: process.env.DATABASE_DB_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB_NAME,
        connectionLimit: 1,
        dateStrings: true,
    })
    console.log('Created Database Pool Connection');
}

module.exports = {
    init,
}
