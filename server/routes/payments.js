let router = require('koa-router')()
let braintree = require('braintree')
let config = require('../.././braintreeConfig.js')

let gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: config.MERCHANT_ID,
  publicKey: config.PUBLIC_KEY,
  privateKey: config.PRIVATE_KEY
})

const getUserTransactions = async (ctx, tenantOrLandlord) => {
  let output, transactionsArray
  output = {}
  transactionsArray = await ctx.db.query(`SELECT * FROM transactions WHERE sender_id = ${tenantOrLandlord.user_id};`)
  output.sentPayments = transactionsArray.rows
  transactionsArray = await ctx.db.query(`SELECT * FROM transactions WHERE recipient_id = ${tenantOrLandlord.user_id};`)
  output.receivedPayments = transactionsArray.rows
  return output
}

router
  .post('/payrent', async ctx => {
    let nonceFromClient = ctx.request.body.nonce
    console.log(nonceFromClient)

    await gateway.transaction.sale({
      amount: "100.00",
      paymentMethodNonce: 'fake-valid-nonce',
      options: {
        submitForSettlement: true
      }
    })
    let paymentIdentifier = new Date().toISOString().split('-').join('').split(':').join('').split('.').join('')
    ctx.response.status = 201
    ctx.body = 'Successful payment'

  }) 

module.exports = {
  routes: router,
  getUserTransactions: getUserTransactions,
}