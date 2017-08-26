let router = require('koa-router')()

//responds to /users, /users/:email

router
	.get('/', ctx => {
		ctx.body = 'got users'
	})
	.get('/:email', ctx => {
		ctx.body = 'got user by email'
	})

	module.exports = router
