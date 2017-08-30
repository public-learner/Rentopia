let router = require('koa-router')()

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

router
	.get('/:id', async (ctx, next) => {
		let propertyRows
		propertyRows = await ctx.db.query(`SELECT * FROM properties WHERE property_id = ${ctx.params.id};`)
		ctx.body = propertyRows.rows[0]
	})
	.get('/all/:landlord_id', async (ctx, next) => {
		let propertyRows
		propertyRows = await ctx.db.query(`SELECT * FROM properties WHERE landlord_id = ${ctx.params.landlord_id};`)
		ctx.body = propertyRows.rows[0]	
	})

module.exports = {
	routes: router,
	getProperty: getProperty,
	getLandlordProperties: getLandlordProperties,
}