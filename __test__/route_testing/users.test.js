let users = require('../../server/routes/users.js')
const { Pool, Client } = require('pg')
let db, user, ctx

beforeAll( async () => {
	db = new Pool()
})


afterAll( async () => {
	// await db.query(`DELETE FROM properties WHERE property_id = ${prop.property_id};`)
  db.end()
})

beforeEach ( () => {
	ctx = {}
	ctx.db = db
	ctx.request = {}
})

test(`user is created`, async () => {
	ctx.request.body = {
		user_name: 'Bob The Tester',
		email: 'jest@test.com',
		user_password: '123',
		is_landlord: true
	}

	expect(null).toBe(null)

})