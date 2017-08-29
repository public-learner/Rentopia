let router = require('koa-router')()

const getTenantMessages = async (ctx, tenant) => {
	let messageRows 
	messageRows = ctx.db.query(`SELECT * FROM messages WHERE sender_id = ${tenant.user_id} AND property_id IS NULL;`)
	output.sentMessages = messageRows.rows
	messageRows = ctx.db.query(`SELECT * FROM messages WHERE recipient_id = ${tenant.user_id} AND property_id IS NULL;`)
	output.received = messageRows.rows
	messageRows = ctx.db.query(`SELECT * FROM messages WHERE property_id = ${tenant.user_id}  AND sender_id IS NULL AND recipient_id IS NULL;`)
	output.broadcasts = messageRows.rows
	// returns {sentMessages[], receivedMessages[], broadcasts[]}
	return output
}

module.exports = {
	routes: router,
	getTenantMessages: getTenantMessages
}