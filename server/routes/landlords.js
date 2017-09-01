let router = require('koa-router')()
let props = require('./props.js')
let payments = require('./payments.js')
let messages = require('./messages.js')
let Promise = require('bluebird')


const createLandlord = async (ctx, user) => {
	console.log(`creating landlord.........`)
	let ll, llRows
	llRows = await ctx.db.query(`INSERT INTO landlords (user_id) VALUES (${user.user_id}) RETURNING *`)
	ll = llRows.rows[0]
	return ll
}
exports.createLandlord = createLandlord

const getLandlord = async (ctx, user_id) => {
	let ll, llRows
	llRows = await ctx.db.query(`SELECT * FROM landlords WHERE user_id = ${user_id};`)
	ll = llRows.rows[0]
	return ll
}
exports.getLandlord = getLandlord

const getLandlordById = async (ctx, landlord_id) => {
	let ll, llRows
	llRows = await ctx.db.query(`SELECT * from landlords WHERE landlord_id = ${landlord_id}`)
	ll = llRows.rows[0]
	return ll
}
exports.getLandlordById = getLandlordById

const getLandlordData = async (ctx, user) => {
	let landlord, properties, transactions, msgs
	landlord = await getLandlord(ctx, user.user_id)
	if(landlord) {
		[properties, transactions, msgs] = await Promise.all([
			props.getLandlordProperties(ctx, landlord.landlord_id),
			payments.getUserTransactions(ctx, landlord),
			messages.getUserMessages(ctx, landlord.user_id)
			])
		// properties = await props.getLandlordProperties(ctx, landlord.landlord_id)
		// transactions = await payments.getUserTransactions(ctx, landlord)
		// msgs = await messages.getUserMessages(ctx, landlord.user_id)
		return {landlord: landlord, properties: properties, transactions: transactions, messages:msgs}
	} else {
		return null
	}
}
exports.getLandlordData = getLandlordData

router
	.get('/:user_id', async (ctx, next) => {
		let ll 
		ll = await getLandlord(ctx, ctx.params.user_id)
		if(ll) {
			ctx.response.status = 302
			ctx.body = ll
		} else {
			ctx.response.status = 404
			ctx.body = 'No landlord found by that ID'
		}
	})
	.post('/', async (ctx, next) => {
		//ctx.request.body = {user}
		let ll
		if(ctx.request.body.user) ll = await createLandlord(ctx, ctx.request.body.user)
		if(ll) {
			ctx.response.status = 201
			ctx.body = ll
		} else {
			ctx.response.status = 400
			ctx.body = `There was an error creating the landlord`
		}
	})
	.post('/data', async (ctx, next) => {
		let data
		// ctx.request.body = {user}
		if(ctx.request.body.user) data = await getLandlordData(ctx, ctx.request.body.user)
		if(data) {
			ctx.response.status = 302
			ctx.body = data
		} else {
			ctx.response.status = 400
			ctx.body = `There was an error with your request`
		}
	})
exports.routes = router

// module.exports = {
// 	routes: router,
// 	createLandlord: createLandlord,
// 	getLandlord: getLandlord,
// 	getLandlordData: getLandlordData,
// }
