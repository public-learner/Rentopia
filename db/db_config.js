const { Pool, Client } = require('pg')

// pools will use environment variables
// for connection information
const pool = new Pool({
  user: 'postgres',
  database: 'leasetopia',
  password: '8BroomH1ll'
})

module.exports = {
  query: (text, params) => pool.query(text, params)
}
