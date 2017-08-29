let auth = require('koa-router')()
let tenants = require('./tenants.js')
let landlords = require('./landlords.js')
let props = require('./props.js')


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


//signup
auth
	.post('/signup', async (ctx, next) => {
		//data stored in ctx.request.body
		let output, user;
		user = await ctx.db.query(`SELECT * FROM users WHERE email = '${ctx.request.body.email}';`)
		if(user.rowCount !== 0) {
			// Send error, user already exists
			ctx.response.status = 418
			ctx.body = `User already exists`
		} else {
			const userRows = await ctx.db.query(`INSERT INTO users (email, user_password, is_landlord) VALUES ('${ctx.request.body.email}', '${ctx.request.body.password}', ${ctx.request.body.isLandlord}) RETURNING *;`)
			user = userRows.rows[0]

			const isLandlord = ctx.request.body.isLandlord
			// we created a user. Now we want to make a matching landlord record OR tenant record for them.
			if(isLandlord){
				//if it's a landlord, create it
				const landlordOut = await landlords.createLandlord(ctx, user)
				//return the user that was created and the landlord that was created
				output = {user: user, landlord: landlordOut}
			} else {
				let tenant
				// see if there is an active tenant, via email
				tenant = await tenants.checkForActiveTenant(ctx, user)
				if(tenant) {
					//if yes, link tenant to user and return user, tenant, and property
					tenant = await tenants.updateTenant(ctx, user, tenant)
					//retrieve the tenant data for this tenant
					output = await retrieveActiveTenantData(ctx, tenant)
					output.user = user
				} else {
					//if not, create new tenant user not associated to a property
					tenant = await tenants.createNewTenant(ctx, user)
					output = {user: user, tenant: tenant, property: property}
				}
			}
			ctx.body = output
		}
	})


//signin




module.exports = {
	routes: auth,
}