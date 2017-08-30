let router = require('koa-router')()

const getUserMessages = async (ctx, tenantOrLandlord) => {
  //REFACTOR WITH PROMISE.ALL
	
	let messageRows, output
	output = {} 

	messageRows = await ctx.db.query(`SELECT * FROM messages WHERE sender_id = ${tenantOrLandlord.user_id} AND property_id IS NULL;`)
	output.sentMessages = messageRows.rows
	messageRows = await ctx.db.query(`SELECT * FROM messages WHERE recipient_id = ${tenantOrLandlord.user_id} AND property_id IS NULL;`)
	output.received = messageRows.rows
	if(tenantOrLandlord.landlord_id) {
		messageRows = await ctx.db.query(`SELECT * FROM messages WHERE property_id = ${tenantOrLandlord.property_id}  AND sender_id IS NULL AND recipient_id IS NULL;`)
		output.broadcasts = messageRows.rows
	}
	// returns {sentMessages[], receivedMessages[], broadcasts[]}
	return output
}

const getPropertyBroadcasts = async (ctx, property_id) => {
	let broadcastsRows, broadcasts
	broadcastsRows = await ctx.db.query(`SELECT * FROM messages WHERE property_id = ${property_id} AND sender_id IS NULL AND recipient_id IS NULL;`)
	broadcasts = broadcastsRows.rows
	return broadcasts
}

router
	.get('/:id', async (ctx, next) => {
		let messageRows
		messageRows = await ctx.db.query(`SELECT * FROM messages WHERE message_id = ${ctx.params.id};`)
		ctx.body = messageRows.rows[0]
	})

module.exports = {
	routes: router,
	getUserMessages: getUserMessages,
	getPropertyBroadcasts: getPropertyBroadcasts,
}