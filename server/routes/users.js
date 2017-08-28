let router = require('koa-router')()

//responds to /users, /users/:email

router
	.get('/', async (ctx, next) => {
		ctx.body = await ctx.db.query(`SELECT * FROM users;`)
	})
	.get('/:email', ctx => {
		ctx.body = 'got user by email'
	})

	module.exports = {
		routes: router,
	}
