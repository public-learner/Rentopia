let router = require('koa-router')()

const updateTenant = async (ctx, user) => {
	let tenantRows = ctx.db.query(`UPDATE tenants SET user_id = ${user.user_id} WHERE tenant_email = '${user.email}'' AND is_active = true RETURNING *;`)
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
	let property, docs, messages, transactions
	property = await props.getProperty(ctx, tenant.property_id)
	//docs will return as {tenant docs, propertyDocs}
	docs = await docs.getTenantDocs(ctx, tenant)
	// messages will return as {sentMessages[], receivedMessages[], broadcasts[]}
	messages = await messages.getTenantMessages(ctx, tenant)
	//transactions = await getTenantTransactions(ctx, tenant)
	output = {tenant: tenant, property: property, messages: messages, docs: docs}
	return output
}

module.exports = {
	routes: router,
	updateTenant: updateTenant,
	createNewTenant: createNewTenant,
	checkForActiveTenant: checkForActiveTenant,
	retrieveActiveTenantData: retrieveActiveTenantData,
}