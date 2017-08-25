const { Pool, Client } = require('pg')

// pools will use environment variables
// for connection information
const pool = new Pool()


module.exports = pool;
