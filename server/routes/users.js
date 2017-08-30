let router = require('koa-router')()

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
	.get('/', async (ctx, next) => {
		ctx.body = await ctx.db.query(`SELECT * FROM users;`)
	})
	.get('/:email', ctx => {
		ctx.body = 'got user by email'
	})

	module.exports = {
		routes: router,
		getUserByEmail: getUserByEmail,
		createUser: createUser,
	}
