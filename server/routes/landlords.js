let router = require('koa-router')()

let createLandlord = async (ctx, landlord) => {
	console.log(`creating landlord.........`)
	let ll = await ctx.db.query(`INSERT INTO landlords (landlord_name, user_id) VALUES ('${landlord.name}', ${landlord.user.user_id}) RETURNING *`)
	// console.log(ll)
	return ll
}


router
	.get('/:id', async (ctx, next) => {

	})
	.post('/add', async (ctx, next) => {
		// console.log(ctx.request.landlord)
		console.log('hello, dave')
		ctx.body = `hello, dave`
	})


module.exports = {
	routes: router,
	createLandlord: createLandlord,
}
