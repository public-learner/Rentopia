let router = require('koa-router')()
let props = require('./props.js')
let messages = require('./messages.js')
let docs = require('./docs.js')
let payments = require('./payments.js')
let Users = require('./users.js')

const updateTenant = async (ctx, user) => {
	let tenantRows
	if(user) {
		tenantRows = ctx.db.query(`UPDATE tenants SET user_id = ${user.user_id} WHERE tenant_email = '${user.email}' AND is_active = true RETURNING *;`)
	} else {
		// add landlord updating here
	}
	return tenantRows.rows[0]
}	

const checkForActiveTenant = async (ctx, user, email) => {
	let tenantRows
	console.log('checked for active tenant')
	if(user) {
		tenantRows = await ctx.db.query(`SELECT * FROM tenants WHERE tenant_email = '${user.email}' AND is_active = true;`)
	} else {
		tenantRows = await ctx.db.query(`SELECT * FROM tenants WHERE tenant_email = '${email}' AND is_active = true;`)
	}
	return tenantRows.rows[0]
}

const createNewTenant = async (ctx, user, property_id) => {
	console.log('started to create tenant')
	let tenant
	if(user && property_id) {
		// created by landlord
		// ctx.request.body = {property_id, tenant_email, rent, due_date}
		tenant = await ctx.db.query(`INSERT INTO tenants (user_id, tenant_email, is_active, rent, due_date) VALUES (${user.user_id}, '${ctx.request.body.tenant_email}', true, ${ctx.request.body.rent}, TO_DATE('${ctx.request.body.due_date}', 'DD/MM/YYYY')) RETURNING *;`)
	} else if (!user && property_id) {
		tenant = await ctx.db.query(`INSERT INTO tenants (tenant_email, is_active, rent, due_date) VALUES ('${ctx.request.body.tenant_email}', true, ${ctx.request.body.rent}, TO_DATE('${ctx.request.body.due_date}', 'DD/MM/YYYY')) RETURNING *;`)
	} else {
		// created by user signing up with no active tenants for email address
		tenant = await ctx.db.query(`INSERT INTO tenants (user_id, tenant_email, is_active) VALUES ('${user.user_id}', '${user.email}', true) RETURNING *;`)
	}
	return tenant.rows[0]
}

const retrieveActiveTenantData = async (ctx, tenant) => {
	let property, docArray, messagesArray, transactions
	property = await props.getProperty(ctx, tenant.property_id)
	// docs will return as {tenant docs, propertyDocs}
	docArray = await docs.getUserDocs(ctx, tenant)
	// messages will return as {sentMessages[], receivedMessages[], broadcasts[]}
	messagesArray = await messages.getUserMessages(ctx, tenant)
	transactions = await payments.getUserTransactions(ctx, tenant)
	output = {tenant: tenant, property: property, messages: messagesArray, docs: docArray}
	return output
}

router
	.get('/:property_id', async (ctx, next) => {
		// gets all tenants at a specific property
		let tenantRows
		tenantRows = await ctx.db.query(`SELECT * FROM tenants WERE property_id = ${this.params.property_id}`)
		return tenantRows.rows
	})
	.post('/bylandlord/create', async (ctx, next) => {
		// ctx.request.body = {property_id, tenant_email, rent, due_date}
		// console.log('made it to bylandlord')
		let obj, user, tenant
		obj = ctx.request.body
		// needs to check if tenant has a user
		user = await Users.getUserByEmail(ctx, obj.tenant_email)
		if(user) {
			// if it does, check if user has active tenant
			tenant = await checkForActiveTenant(ctx, user)
		} else {
			//has no user, but still need to check if it has an active tenant to prevent conflicts
			tenant = await checkForActiveTenant(ctx, null, obj.tenant_email)
		}

		if(tenant) {
				// if tenant, throw error
				ctx.response.status = 403
				ctx.body = `This tenant is currently active in another property`				
			} else {
				// if no active tenant, create tenant and return it
				tenant = await createNewTenant(ctx, user, obj.property_id)
				ctx.body = tenant
			}
	})

module.exports = {
	routes: router,
	updateTenant: updateTenant,
	createNewTenant: createNewTenant,
	checkForActiveTenant: checkForActiveTenant,
	retrieveActiveTenantData: retrieveActiveTenantData,
}