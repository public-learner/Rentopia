let router = require('koa-router')()

let getProperty = async (ctx, property_id) => {
	let property = await ctx.db.query(`SELECT * FROM properties WHERE property_id = ${property_id} RETURNING *;`)
}

module.exports = {
	router: router,
	getProperty: getProperty,
}