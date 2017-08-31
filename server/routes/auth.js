let auth = require('koa-router')()
let landlords = require('./landlords.js')
let props = require('./props.js')
let payments = require('./payments.js')
let tenants = require('./tenants.js')
let Users = require('./users.js')

// Signup
auth
	.post('/signup', async (ctx, next) => {
		// data stored in ctx.request.body
		let output, user, tenant;
		user = await Users.getUserByEmail(ctx)
		if(user) {
			// send error, user already exists
			ctx.response.status = 418
			ctx.body = `User already exists`
		} else {
			// create new user record here
			user = await Users.createUser(ctx)
			console.log(`User created:  ${user}`)
			const isLandlord = ctx.request.body.isLandlord
			// we created a user. Now we want to make a matching landlord record OR tenant record for them.
			if(isLandlord){
				// if it's a landlord, create it
				const landlordOut = await landlords.createLandlord(ctx, user)
				console.log(`Landlord created, user_id:  ${landlordOut.user_id}`)
				// return the user that was created and the landlord that was created
				output = {user: user, landlord: landlordOut}
			} else {
				// see if there is an active tenant, via email
				tenant = await tenants.checkForActiveTenant(ctx, user)
				if(tenant) {
					// if yes, link tenant to user and return user, tenant, and property
					tenant = await tenants.updateTenant(ctx, user, tenant)
					console.log(`tenant found, tenant_id:  ${tenant.tenant_id}`)
					// retrieve the tenant data for this tenant
					output = await tenants.retrieveActiveTenantData(ctx, tenant)
					output.user = user
				} else {
					// if not, create new tenant user not associated to a property
					tenant = await tenants.createNewTenant(ctx, user)
					console.log(`tenant created, tenant_id:  ${tenant.tenant_id}`)
					output = {user: user, tenant: tenant}
				}
			}
			ctx.body = output
		} // end User Does Not Exist
	}) //end signup

// Sign in
	.post('/signin', async (ctx, next) => {
		// insert actual user auth here
		let user, tenant, landlord, properties, output
		user = await Users.getUserByEmail(ctx)
		if(!user) {
			console.log('User does not exist')
			ctx.response.status = 403
			ctx.body = 'No user exists'
		}

		if(user && user.is_landlord) {
			output = await landlords.getLandlordData(ctx, user)
			output.user = user
			ctx.body = output
		} else if(user) {
			tenant = await tenants.checkForActiveTenant(ctx, user)
			if(tenant) {
				//all gucci
				output = await tenants.retrieveActiveTenantData(ctx, tenant)
				output.user = user
				ctx.body = output
			} else {
				ctx.response.status = 403
				ctx.body = `WOOP WOOP WOOP -- Forbidden`
			}
		}
	}) // end sign in



module.exports = {
	routes: auth,
}