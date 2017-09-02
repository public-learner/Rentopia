let docs = require('../../server/routes/docs.js')
const { Pool, Client } = require('pg')
let db, prop, tenant

beforeAll( async () => {
	db = new Pool()
	await db.query(`INSERT INTO properties (property_name) VALUES ('jest_test_prop');`)
	await db.query(`INSERT INTO tenants (tenant_email, rent, is_active) VALUES ('jesttest@test.com', 750, true);`)
	db.query(`DELETE FROM documents;`)
})


afterAll( async () => {
	await db.query(`DELETE FROM properties WHERE property_id = ${prop.property_id};`)
  db.end()
})

test('create rawtext doc', async () => {

	prop = await db.query(`SELECT * FROM properties WHERE property_name = 'jest_test_prop';`)
	prop = prop.rows[0]
	tenant = await db.query(`SELECT * FROM tenants WHERE tenant_email = 'jesttest@test.com';`)
	tenant = tenant.rows[0]

	let ctx = {
		request: {
			body: {
				landlord_id: null, 
				doc_type: "rawtext",
				tenant_id: tenant.tenant_id,
				property_id: prop.property_id,
				doc_body: "Test doc"
			}
		}
	}
	ctx.db = db

	let rawDoc = await docs.createRawtext(ctx)
  expect(rawDoc.doc_body).toBe("Test doc")

})

test('find rawtext doc', async () => {
	let ctx = {}
	ctx.db = db

  let tenant_doc = await docs.getUserDocs(ctx, tenant)
  expect(tenant_doc.tenantDocs.length).toBe(1)
})


//need to test routes