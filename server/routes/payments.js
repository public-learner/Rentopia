let router = require('koa-router')()
let braintree = require('braintree')
let config = require('../.././braintreeConfig.js')
let Landlords = require('./landlords.js')
let Promise = require('bluebird')

let gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: config.MERCHANT_ID,
  publicKey: config.PUBLIC_KEY,
  privateKey: config.PRIVATE_KEY
})

const getSenderTransactions = async (ctx, tenantOrLandlord) => {
  let results = ctx.db.query(`SELECT * FROM transactions WHERE sender_id = ${tenantOrLandlord.user_id};`)
  return results.rows
}

const getRecipientTransactions = async (ctx, tenantOrLandlord) => {
  let results = ctx.db.query(`SELECT * FROM transactions WHERE recipient_id = ${tenantOrLandlord.user_id};`)
  return results.rows
}

const getUserTransactions = async (ctx, tenantOrLandlord) => {
  let output, sent, received
  output = {}
  [sent, received] = await Promise.all([
    getSenderTransactions(ctx, tenantOrLandlord),
    getRecipientTransactions(ctx, tenantOrLandlord)
  ])
  output.sentPayments = sent
  output.receivedPayments = received
  return output
}
exports.getUserTransactions = getUserTransactions

router
  .get('/:id', async (ctx, next) => {
    let paymentRows
    paymentRows = ctx.db.query(`SELECT * FROM transactions WHERE transaction_id = ${ctx.params.id};`)
    ctx.body = await paymentRows.rows[0]
  })
  .post('/payRent', async ctx => {
    let nonceFromClient = ctx.request.body.nonce

    let result = await gateway.transaction.sale({
      merchantAccountId: 'jordan_hoang_instant_8n6sfbpx',
      amount: "500.00",
      paymentMethodNonce: 'fake-valid-nonce',
      options: {
        submitForSettlement: true
      },
      serviceFeeAmount: "00.00"
    })

    console.log(result)
    let paymentIdentifier = result.transaction.id
    if (result.success) {
      ctx.response.status = 201
      ctx.body = 'Successful payment'
    }
  })
  .put('/submerchantCreation/:landlord_id', async ctx => {
    ctx.request.body.merchantAccountParams.masterMerchantAccountId = config.MERCHANT_ACCOUNT_ID
    let merchantAccountParams = ctx.request.body.merchantAccountParams

    let result = await gateway.merchantAccount.create(merchantAccountParams)
    if (!result.success) {
      ctx.response.status = 400
      ctx.body = result.message
    } else {      
      // update the landlord record with the merchantAccount id using ctx.request.body.landlord_id  
      ctx.request.body.merchant_id = result.merchantAccount.id
      let landlord = await Landlords.updateMerchant(ctx, ctx.params.landlord_id)  
      if(landlord) {
        ctx.response.status = 201
        ctx.body = 'Succesful payment setup'   
      } else {
        ctx.response.status = 400
        ctx.body = 'Error updating Landlord'
      }
    }
  }) 
  exports.routes = router

// module.exports = {
//   routes: router,
//   getUserTransactions: getUserTransactions,
// }
