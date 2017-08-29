let router = require('koa-router')()

let createLandlord = async (ctx, user) => {
	console.log(`creating landlord.........`)
	let ll = await ctx.db.query(`INSERT INTO landlords (user_id) VALUES (${user.user_id}) RETURNING *`)
	// console.log(ll)
	return ll.rows[0]
}


router
	.get('/:id', async (ctx, next) => {

	})
	.post('/add', async (ctx, next) => {
		
	})


module.exports = {
	routes: router,
	createLandlord: createLandlord,
}
