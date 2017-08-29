let router = require('koa-router')()
let braintree = require('braintree')
let config = require('../.././braintreeConfig.js')

let gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: config.MERCHANT_ID,
  publicKey: config.PUBLIC_KEY,
  privateKey: config.PRIVATE_KEY
})

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
    ctx.response.status = 201
    ctx.body = 'Successful payment'

    // gateway.transaction.sale({
    //   amount: "100.00",
    //   paymentMethodNonce: 'fake-valid-nonce',
    //   options: {
    //     submitForSettlement: true
    //   }
    // }, await function (err, result) {
    //   console.log('PAID')
    //   ctx.response.status = 201
    //   ctx.body = 'Successful payment'
    // });
  }) 

module.exports = router