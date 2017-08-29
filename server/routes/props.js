let router = require('koa-router')()

const getProperty = async (ctx, property_id) => {
	let property = await ctx.db.query(`SELECT * FROM properties WHERE property_id = ${property_id};`)
	return property.rows[0]
}

module.exports = {
	routes: router,
	getProperty: getProperty,
}