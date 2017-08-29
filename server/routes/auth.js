let auth = require('koa-router')()
let tenants = require('./tenants.js')
let landlords = require('./landlords.js')
let props = require('./props.js')

//signup
auth
	.post('/signup', async (ctx, next) => {
		//data stored in ctx.request.body
		let output;
		let user = await ctx.db.query(`SELECT * FROM users WHERE email = ${ctx.request.body.email};`)
		if(user.rowCount !== 0) {
			// Send error, user already exists
			ctx.response.status = 418
			ctx.body = `User already exists`
		} else {
			user = await ctx.db.query(`INSERT INTO users (email, user_password, is_landlord) VALUES ('${ctx.request.body.email}', '${ctx.request.body.password}', ${ctx.request.body.isLandlord}) RETURNING *;`)
			//insert will return an obj with command, rowCount, oid, rows[{}], and fields[]
			//ctx.body = user
			const isLandlord = ctx.request.body.isLandlord
			// we created a user. Now we want to make a matching landlord record OR tenant record for them.
			if(isLandlord){
				//if it's a landlord, create it
				user = insert.rows[0]
				const landlordOut = await landlords.createLandlord(ctx, user)
				//return the user that was created and the landlord that was created
				output = {user: user, landlord: landlordOut}
			} else {
				let tenant, property
				//if it's not a landlord, it will be a tenant
				//see if the user has any active tenant records to link to the user VIA EMAIL
				if(tenantRows.length > 0) {
					//if yes, link tenant to user and return user, tenant, and property
					tenant = await tenants.updateTenant(ctx, user)
					property = await props.getProperty(ctx, tenant.property_id)
					//need docs
					//need direct messages messages
					//need property broadcasts
					//transactions
				} else {
					//if not, create new tenant user not associated to a property
				}
			}
		}
		ctx.body = output
	})


//signin




module.exports = {
	routes: auth,
}