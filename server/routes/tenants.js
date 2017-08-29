let router = require('koa-router')()

const updateTenant = async (ctx, user) => {
	let tenantRows = ctx.db.query(`UPDATE tenants SET user_id = ${user.user_id} WHERE tenant_email = ${user.email} AND is_active = true RETURNING *;`)
	return tenantRows.rows[0]
}	

const checkForActiveTenant = async (ctx, user) => {
	let tenantRows = await ctx.db.query(`SELECT * FROM tenants WHERE tenant_email = ${user.email} AND is_active = true;`)
	return tenantRows.rows[0]
}

module.exports = {
	router: router,
	updateTenant: updateTenant,

}