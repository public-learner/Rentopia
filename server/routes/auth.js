let auth = require('koa-router')()
let tenants = require('./tenants.js')
let landlords = require('./landlords.js')
let props = require('./props.js')


const getUserByEmail = async (ctx) => {
	let userRows
	userRows = await ctx.db.query(`SELECT * FROM users WHERE email = '${ctx.request.body.email}';`)
	return userRows.rows[0]
}

const createUser = async (ctx) => {
	let userRows
	userRows = await ctx.db.query(`INSERT INTO users (email, user_password, is_landlord) VALUES ('${ctx.request.body.email}', '${ctx.request.body.password}', ${ctx.request.body.isLandlord}) RETURNING *;`)
	return userRows.rows[0]
}

// Signup
auth
	.post('/signup', async (ctx, next) => {
		// data stored in ctx.request.body
		let output, user;
		user = await getUserByEmail(ctx)
		if(user) {
			// send error, user already exists
			ctx.response.status = 418
			ctx.body = `User already exists`
		} else {
			// create new user record here
			user = createUser(ctx)

			const isLandlord = ctx.request.body.isLandlord
			// we created a user. Now we want to make a matching landlord record OR tenant record for them.
			if(isLandlord){
				// if it's a landlord, create it
				const landlordOut = await landlords.createLandlord(ctx, user)
				// return the user that was created and the landlord that was created
				output = {user: user, landlord: landlordOut}
			} else {
				let tenant
				// see if there is an active tenant, via email
				tenant = await tenants.checkForActiveTenant(ctx, user)
				if(tenant) {
					// if yes, link tenant to user and return user, tenant, and property
					tenant = await tenants.updateTenant(ctx, user, tenant)
					// retrieve the tenant data for this tenant
					output = await tenants.retrieveActiveTenantData(ctx, tenant)
					output.user = user
				} else {
					// if not, create new tenant user not associated to a property
					tenant = await tenants.createNewTenant(ctx, user)
					output = {user: user, tenant: tenant, property: property}
				}
			}
			ctx.body = output
		} // end User Does Not Exist
	}) //end signup

// Sign in
	.get(`/signin`, async (ctx, next) => {
		// insert actual user auth here
		let user, tenant, landlord, output
		user = await getUserByEmail(ctx)
		if(user.is_landlord) {
			//landlord = await landlords.getLandlord(ctx, user)
		} else {
			tenant = await checkForActiveTenant(ctx, user)
			if(tenant) {
				//all gucci
				output = await tenants.retrieveActiveTenantData(ctx, tenant)
				output.user = user
			} else {
				ctx.response.status = 402
				ctx.body = `WOOP WOOP WOOP -- Forbidden`
			}
		}
		ctx.body = output
	}) // end sign in



module.exports = {
	routes: auth,
	getUserByEmail: getUserByEmail,
}