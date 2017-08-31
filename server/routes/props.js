let router = require('koa-router')()
let Messages = require('./messages.js')


const getProperty = async (ctx, property_id) => {
	let property = await ctx.db.query(`SELECT * FROM properties WHERE property_id = ${property_id};`)
	return property.rows[0]
}

const getLandlordProperties = async (ctx, landlord_id) => {
	let propsRows, props
	propsRows = await ctx.db.query(`SELECT * FROM properties WHERE landlord_id = ${landlord_id};`)
	props = propsRows.rows
	return props
}

const addProperty = async (ctx, landlord_id) => {
	let propsRows, prop, obj
	obj = ctx.request.body
	propsRows = await ctx.db.query(`INSERT INTO properties (property_name, address, city, state_abbrv, landlord_id) VALUES ('${obj.property_name}', '${obj.address}', '${obj.city}', '${obj.state_abbrv}', ${landlord_id}) RETURNING *;`)
	prop = propsRows.rows[0]
	return prop
}

router
	.get('/:id', async (ctx, next) => {
		ctx.body = await getProperty(ctx, ctx.params.id)
	})
	.get('/all/:landlord_id', async (ctx, next) => {
		ctx.body = await getLandlordProperties(ctx, ctx.params.landlord_id)
	})
	.get('/broadcasts/:property_id', async (ctx, next) => {
		ctx.body = await Messages.getPropertyBroadcasts(ctx, ctx.params.property_id)
	})
	.post('/', async (ctx, next) => {
		ctx.body = await addProperty(ctx, ctx.request.body.landlord_id)
	})

module.exports = {
	routes: router,
	getProperty: getProperty,
	getLandlordProperties: getLandlordProperties,
}