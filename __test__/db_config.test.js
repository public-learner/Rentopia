const { Pool, Client } = require('pg')
let pool

beforeAll( () => {
	pool = new Pool()
})

afterAll( () => {
	pool.end()
})
//credentials should work from env variables
test('Creds work, query successfully', async () => {
	await expect(pool.query('SELECT $1::text as greeting', ['hello world'])
  .then( (res) => { 
  	return res.rows[0].greeting 
  })
  ).resolves.toBe('hello world') // hello world
})

test('Number of tables should be 8', async () => {
	await expect(pool.query(`SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'public';`)
		.then( res => {
			return res.rows.length
		})
		).resolves.toBe(8)
})

//test insertion and query of data