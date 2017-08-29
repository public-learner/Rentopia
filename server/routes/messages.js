let router = require('koa-router')()

const getUserMessages = async (ctx, tenantOrLandlord) => {
	let messageRows, output
	output = {} 

	messageRows = ctx.db.query(`SELECT * FROM messages WHERE sender_id = ${tenantOrLandlord.user_id} AND property_id IS NULL;`)
	output.sentMessages = messageRows.rows
	messageRows = ctx.db.query(`SELECT * FROM messages WHERE recipient_id = ${tenantOrLandlord.user_id} AND property_id IS NULL;`)
	output.received = messageRows.rows
	if(tenantOrLandlord.landlord_id) {
		messageRows = ctx.db.query(`SELECT * FROM messages WHERE property_id = ${tenantOrLandlord.property_id}  AND sender_id IS NULL AND recipient_id IS NULL;`)
		output.broadcasts = messageRows.rows
	}
	// returns {sentMessages[], receivedMessages[], broadcasts[]}
	return output
}

module.exports = {
	routes: router,
	getUserMessages: getUserMessages
}