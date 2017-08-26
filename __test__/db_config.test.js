var pool = require('../db/db_config.js')

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

//test insertion and query of data