let router = require('koa-router')()
let bcrypt = require('bcrypt-nodejs')
//responds to /users, /users/:email

const getUserByEmail = async (ctx, email) => {
	let userRows, user
	if(ctx.request.body.email) email = ctx.request.body.email
	userRows = await ctx.db.query(`SELECT * FROM users WHERE email = '${email}';`)
	user = userRows.rows[0]
	return user
}

const createUser = async (ctx) => {
	let userRows, user
	userRows = await ctx.db.query(`INSERT INTO users (email, user_password, is_landlord) VALUES ('${ctx.request.body.email}', '${ctx.request.body.password}', ${ctx.request.body.isLandlord}) RETURNING *;`)
	user = userRows.rows[0]
	return user
}


router
	.get('/:id', async (ctx, next) => {
		let userRows
		userRows = await ctx.db.query(`SELECT * FROM users WHERE user_id = ${ctx.params.id};`)
		ctx.body = userRows.rows[0]
	})
	.put('/:id', async (ctx, next) => {
		// ctx.request.body  {user_name, email, user_password, creditcard}
		let userRows, req
		req = ctx.request.body
		userRows = await ctx.db.query(`UPDATE users SET (user_name, email, user_password, creditcard) = ('${req.user_name}', '${req.email}', '${req.user_password}', '${req.creditcard}') WHERE user_id = ${ctx.params.id} RETURNING *;`)
		ctx.body = userRows.rows[0]
	})
	.get('/', async (ctx, next) => {
		let userRows
		userRows = await ctx.db.query(`SELECT * FROM users;`)
		ctx.body = userRows.rows
	})
	.get('/:email', async (ctx, next) => {
		let userRows
		userRows = await ctx.db.query(`SELECT * FROM users WHERE email = '${ctx.params.email};'`)
		ctx.body = userRows.rows[0]
	})

	module.exports = {
		routes: router,
		getUserByEmail: getUserByEmail,
		createUser: createUser,
	}
