let auth = require('koa-router')()
let tenants = require('./tenants.js')
let landlords = require('./landlords.js')

//signup
auth
	.post('/signup', async (ctx, next) => {
		//data stored in ctx.request.body
		let user = await ctx.db.query(`SELECT * FROM users WHERE email = $1`, [ctx.request.body.email])
		if(user.rowCount !== 0) {
			// Send error, user already exists
			ctx.response.status = 418
			ctx.body = `User already exists`
		} else {
			let insert = await ctx.db.query(`INSERT INTO users (email, user_password, is_landlord) VALUES ('${ctx.request.body.email}', '${ctx.request.body.password}', ${ctx.request.body.isLandlord}) RETURNING *;`)
			//insert will return an obj with command, rowCount, oid, rows[{}], and fields[]
			//ctx.body = user
			const isLandlord = ctx.request.body.isLandlord
			// we created a user. Now we want to make a matching landlord record OR tenant record for them.
			if(isLandlord){
				let landlord = {
					name: ctx.request.body.name,
					user: insert.rows[0],
				}
				const landlordOut = await landlords.createLandlord(ctx, landlord)

				//return the user that was created and the landlord that was created
				ctx.body = {user: insert.rows[0], landlord: landlordOut.rows[0]}
			}
		}
	})


//signin




module.exports = {
	routes: auth,
}