let router = require('koa-router')()
let props = require('./props.js')
let payments = require('./payments.js')
let messages = require('./messages.js')
// let props = require('./props.js')

const createLandlord = async (ctx, user) => {
	console.log(`creating landlord.........`)
	let ll = await ctx.db.query(`INSERT INTO landlords (user_id) VALUES (${user.user_id}) RETURNING *`)
	// console.log(ll)
	return ll.rows[0]
}

const getLandlord = async (ctx, user_id) => {
	let ll = await ctx.db.query(`SELECT * FROM landlords WHERE user_id = ${user_id};`)
	return ll.rows[0]
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
		ctx.body = await getLandlord(ctx, this.params.id)
	})


module.exports = {
	routes: router,
	createLandlord: createLandlord,
	getLandlord: getLandlord,
	getLandlordData: getLandlordData,
}
