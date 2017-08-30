let router = require('koa-router')()
let props = require('./props.js')
let payments = require('./payments.js')
let messages = require('./messages.js')

const createLandlord = async (ctx, user) => {
	console.log(`creating landlord.........`)
	let ll, llRows
	llRows = await ctx.db.query(`INSERT INTO landlords (user_id) VALUES (${user.user_id}) RETURNING *`)
	ll = llRows.rows[0]
	return ll
}

const getLandlord = async (ctx, user_id) => {
	let ll, llRows
	llRows = await ctx.db.query(`SELECT * FROM landlords WHERE user_id = ${user_id};`)
	ll = llRows.rows[0]
	return ll
}

const getLandlordData = async (ctx, user) => {
	let landlord, properties, transactions, msgs
	landlord = await getLandlord(ctx, user.user_id)
	properties = await props.getLandlordProperties(ctx, landlord.landlord_id)
	transactions = await payments.getUserTransactions(ctx, landlord)
	msgs = await messages.getUserMessages(ctx, landlord)
	return {landlord: landlord, properties: properties, transactions: transaction, messages:msgs}
}

router
	.get('/:id', async (ctx, next) => {
		let ll = await getLandlord(ctx, ctx.params.id)
		if(ll) {
			ctx.body = ll
		} else {
			ctx.response.status = 404
			ctx.body = 'No landlord found by that ID'
		}
	})


module.exports = {
	routes: router,
	createLandlord: createLandlord,
	getLandlord: getLandlord,
	getLandlordData: getLandlordData,
}
