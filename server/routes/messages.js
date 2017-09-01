let router = require('koa-router')()
let Users = require('./users.js')
let Landlords = require('./landlords.js')
let Tenants = require('./tenants.js')

const getUserMessages = async (ctx, user_id) => {
	let messageRows
	if(!user_id) user_id = null
	messageRows = await ctx.db.query(`SELECT * FROM messages WHERE recipient_id = ${user_id} OR sender_id = ${user_id} AND property_id IS NULL;`)
	// returns array of messages
	return messageRows.rows
}
exports.getUserMessages = getUserMessages

const getPropertyBroadcasts = async (ctx, property_id) => {
	let broadcastsRows, broadcasts
	broadcastsRows = await ctx.db.query(`SELECT * FROM messages WHERE property_id = ${property_id} AND sender_id IS NULL AND recipient_id IS NULL;`)
	broadcasts = broadcastsRows.rows
	return broadcasts
}
exports.getPropertyBroadcasts = getPropertyBroadcasts

router
	.get('/:message_id', async (ctx, next) => {
		let messageRows
		messageRows = await ctx.db.query(`SELECT * FROM messages WHERE message_id = ${ctx.params.message_id};`)
		ctx.body = messageRows.rows[0]
	})
	.get('/broadcasts/:property_id', async (ctx, next) => {
		let broadcasts
		broadcasts = await getPropertyBroadcasts(ctx, ctx.params.property_id)
		ctx.body = broadcasts
	})
	.get('/direct/:user_id', async (ctx, next) => {
		let user, messages, found
		found = false
		//get user by ID
		user = await Users.getUserById(ctx, ctx.params.user_id)
		if(user) {
			found = true
			messages = await getUserMessages(ctx, user.user_id)
		}
		if(found) {
			ctx.response.status = 302
			ctx.body = messages
		} else {
			ctx.response.status = 404
			ctx.body = `User not found, messages could not be loaded`
		}
	})
	exports.routes = router

// module.exports = {
// 	routes: router,
// 	getUserMessages: getUserMessages,
// 	getPropertyBroadcasts: getPropertyBroadcasts,
// }