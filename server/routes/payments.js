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
  //REFACTOR WITH PROMISE.ALL
  let output, transactionsArray
  output = {}
  transactionsArray = await ctx.db.query(`SELECT * FROM transactions WHERE sender_id = ${tenantOrLandlord.user_id};`)
  output.sentPayments = transactionsArray.rows
  transactionsArray = await ctx.db.query(`SELECT * FROM transactions WHERE recipient_id = ${tenantOrLandlord.user_id};`)
  output.receivedPayments = transactionsArray.rows
  return output
}

router
  .get('/:id', async (ctx, next) => {
    let paymentRows
    paymentRows = ctx.db.query(`SELECT * FROM transactions WHERE transaction_id = ${ctx.params.id};`)
    ctx.body = await paymentRows.rows[0]
  })
  .post('/payRent', async ctx => {
    let nonceFromClient = ctx.request.body.nonce
    let wakaflakkaflame

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
  .post('/submerchantCreation', async ctx => {
    ctx.request.body.merchantAccountParams.masterMerchantAccountId = config.MERCHANT_ACCOUNT_ID
    let merchantAccountParams = ctx.request.body.merchantAccountParams
    console.log(merchantAccountParams)

    await gateway.merchantAccount.create(merchantAccountParams, 
      await function(err,result) {
        console.log(result)
    })

    ctx.response.status = 201
    ctx.body = 'Succesful payment setup'
  }) 

module.exports = {
  routes: router,
  getUserTransactions: getUserTransactions,
}