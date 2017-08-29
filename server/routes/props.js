let router = require('koa-router')()

const getProperty = async (ctx, property_id) => {
	let property = await ctx.db.query(`SELECT * FROM properties WHERE property_id = ${property_id};`)
	return property.rows[0]
}

const getLandlordProperties = async (ctx, landlord_id) => {
	let propsRows, props
	propsRows = await ctx.db.query(`SELECT * FROM properties WHERE landlord_id = ${landlord_id}`)
	props = propsRows.rows
	return props
}

module.exports = {
	routes: router,
	getProperty: getProperty,
	getLandlordProperties: getLandlordProperties,
}