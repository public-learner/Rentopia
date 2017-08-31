let router = require('koa-router')()
let props = require('./props.js')
let Messages = require('./messages.js')
let docs = require('./docs.js')
let payments = require('./payments.js')
let Users = require('./users.js')
let Promise = require('bluebird')


const updateTenant = async (ctx, user, tenant_id, property_id) => {
	let tenantRows
	if(user) {
		tenantRows = await ctx.db.query(`UPDATE tenants SET user_id = ${user.user_id} WHERE tenant_email = '${user.email}' AND is_active = true RETURNING *;`)
	} else {
		tenantRows = await ctx.db.query(`UPDATE tenants SET property_id = ${property_id} WHERE tenant_id = ${tenant_id} RETURNING *;`)
	}
	return tenantRows.rows[0]
}	
exports.updateTenant = updateTenant

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
exports.checkForActiveTenant = checkForActiveTenant

const createNewTenant = async (ctx, user, property_id) => {
	console.log('started to create tenant')
	let tenant
	if(user && property_id) {
		// created by landlord
		// ctx.request.body = {property_id, tenant_email, rent, due_date}
		// first check to see if user has active record
			//if he does and it has no prop_id, update that
			//if he does and it has prop_id, return error
			//if he doesn't, create
		tenant = await ctx.db.query(`INSERT INTO tenants (user_id, tenant_email, is_active, rent, due_date) VALUES (${user.user_id}, '${ctx.request.body.tenant_email}', true, ${ctx.request.body.rent}, TO_DATE('${ctx.request.body.due_date}', 'DD/MM/YYYY')) RETURNING *;`)
	} else if (!user && property_id) {
		// Tenant has no user, so we create a tenant record for them to claim
		tenant = await ctx.db.query(`INSERT INTO tenants (tenant_email, is_active, rent, due_date) VALUES ('${ctx.request.body.tenant_email}', true, ${ctx.request.body.rent}, TO_DATE('${ctx.request.body.due_date}', 'DD/MM/YYYY')) RETURNING *;`)
	} else {
		// created by user signing up with no active tenants for email address
		tenant = await ctx.db.query(`INSERT INTO tenants (user_id, tenant_email, is_active) VALUES ('${user.user_id}', '${user.email}', true) RETURNING *;`)
	}
	return tenant.rows[0]
}
exports.createNewTenant = createNewTenant

const retrieveActiveTenantData = async (ctx, tenant) => {
	let property, docArray, messagesArray, transactions, broadcasts
	property = await props.getProperty(ctx, tenant.property_id)
	if(property) {
		broadcasts = await Messages.getPropertyBroadcasts(ctx, property.property_id)
	}
	// docs will return as {tenant docs, propertyDocs}
	[docsArray, messagesArray, transactions] = await Promise.all([
		docs.getUserDocs(ctx, tenant),
		Messages.getUserMessages(ctx, tenant.user_id),
		payments.getUserTransactions(ctx, tenant)
	])
	// docArray = await docs.getUserDocs(ctx, tenant)
	// messagesArray = await Messages.getUserMessages(ctx, tenant.user_id)
	// transactions = await payments.getUserTransactions(ctx, tenant)
	output = {tenant: tenant, property: property, messages: messagesArray, docs: docArray}
	return output
}
exports.retrieveActiveTenantData = retrieveActiveTenantData

router
	.get('/:id', async (ctx, next) => {
		let userRows
		userRows = await ctx.db.query(`SELECT * FROM tenants WHERE tenant_id = ${ctx.params.id};`)
		ctx.body = userRows.rows[0]
	})
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

		if(tenant && tenant.property_id) {
				// if tenant is active and is on a property
				ctx.response.status = 403
				ctx.body = `This tenant is currently active in another property`				
			} else if(tenant && !tenant.property_id) {
				// if tenant is active but has no property, update
				tenant = await updateTenant(ctx, null, tenant.tenant_id, obj.property_id)
				ctx.body = tenant
			} else {
				// if no active tenant, create tenant and return it
				tenant = await createNewTenant(ctx, user, obj.property_id)
				ctx.body = tenant
			}
	})
exports.routes = router

// module.exports = {
// 	routes: router,
// 	updateTenant: updateTenant,
// 	createNewTenant: createNewTenant,
// 	checkForActiveTenant: checkForActiveTenant,
// 	retrieveActiveTenantData: retrieveActiveTenantData,
// }