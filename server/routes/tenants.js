let router = require('koa-router')()
let props = require('./props.js')
let messages = require('./messages.js')
let docs = require('./docs.js')
let payments = require('./payments.js')



const updateTenant = async (ctx, user) => {
	let tenantRows = ctx.db.query(`UPDATE tenants SET user_id = ${user.user_id} WHERE tenant_email = '${user.email}' AND is_active = true RETURNING *;`)
	return tenantRows.rows[0]
}	

const checkForActiveTenant = async (ctx, user) => {
	let tenantRows = await ctx.db.query(`SELECT * FROM tenants WHERE tenant_email = '${user.email}' AND is_active = true;`)
	return tenantRows.rows[0]
}

const createNewTenant = async (ctx, user, property) => {
	if(property) {
		//created by landlord
	} else {
		//created by user signing up with no active tenants for email address
		let tenant = await ctx.db.query(`INSERT INTO tenants (user_id, tenant_email, is_active) VALUES ('${user.user_id}', '${user.email}', true) RETURNING *;`)
		return tenant.rows[0]
	}
}

const retrieveActiveTenantData = async (ctx, tenant) => {
	let property, docArray, messagesArray, transactions
	property = await props.getProperty(ctx, tenant.property_id)
	//docs will return as {tenant docs, propertyDocs}
	docArray = await docs.getUserDocs(ctx, tenant)
	// messages will return as {sentMessages[], receivedMessages[], broadcasts[]}
	messagesArray = await messages.getUserMessages(ctx, tenant)
	transactions = await payments.getUserTransactions(ctx, tenant)
	output = {tenant: tenant, property: property, messages: messagesArray, docs: docArray}
	return output
}

module.exports = {
	routes: router,
	updateTenant: updateTenant,
	createNewTenant: createNewTenant,
	checkForActiveTenant: checkForActiveTenant,
	retrieveActiveTenantData: retrieveActiveTenantData,
}