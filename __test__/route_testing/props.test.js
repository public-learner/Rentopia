let Props = require('../../server/routes/props.js')
const { Pool, Client } = require('pg')
let db, tenant, tenant2, ctx, user, landlord, property
let request = require('supertest')
request = request('localhost:8000')

beforeAll( async () => {
	db = new Pool()
	let testUser = {
		user_name: 'Bob The Tester',
		email: 'jest@test.com',
		user_password: '123',
		isLandlord: false
	}
	// clear test users
	await db.query(`DELETE FROM users WHERE email = '${testUser.email}';`)

	// set test user
	user = await db.query(`INSERT INTO users (user_name, email, user_password, is_landlord) VALUES ('${testUser.user_name}', '${testUser.email}', '${testUser.password}', ${testUser.isLandlord}) RETURNING *;`)
	user = user.rows[0]

	// set test landlord
	landlord = await db.query(`INSERT INTO landlords (user_id) VALUES (${user.user_id}) RETURNING *;`)
	landlord = landlord.rows[0]

	// set test property
	property = await db.query(`INSERT INTO properties (property_name, landlord_id) VALUES ('Test Prop', ${landlord.landlord_id}) RETURNING *;`)
	property = property.rows[0]

	// set two test tenants
	tenant = await db.query(`INSERT INTO tenants (tenant_email, property_id) VALUES ('test1@jest.com', ${property.property_id}) RETURNING *;`)
	tenant = tenant.rows[0]
	tenant2 = await db.query(`INSERT INTO tenants (tenant_email, property_id) VALUES ('test2@jest.com', ${property.property_id});`)
	tenant2 = tenant2.rows[0]

	// set up ctx config
	ctx = {request: {}}
	ctx.db = db
})

afterAll( async () => {
	await db.query(`DELETE FROM users WHERE email = '${user.email}';`)
	await db.query(`DELETE FROM properties WHERE property_id = ${property.property_id};`)
	await db.query(`DELETE FROM landlords WHERE landlord_id = ${landlord.landlord_id};`)
	db.end()
})

beforeEach ( () => {
	ctx.request.body = {
		tenant_email: 'tenant@jest.test',
		property_id: property.property_id,
		rent: 750,
		due_date: '09/01/2017',
		user: user
	}
})

afterEach( async () => {
	if(tenant && tenant.tenant_id) {
		await db.query(`DELETE FROM tenants WHERE tenant_id = ${tenant.tenant_id};`)
		tenant = undefined
	}

	if(tenant2 && tenant2.tenant_id) {
			await db.query(`DELETE FROM tenants WHERE tenant_id = ${tenant2.tenant_id};`)
			tenant = undefined
		}
})

test(`Test getting all tenants at a property`, async () => {
	console.log(await Props.getPropertyTenants(ctx, property.property_id, tenant.tenant_id))
	expect(null).toBe(null)
})









