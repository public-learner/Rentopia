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
  .post('/payrent', ctx => {
    let nonceFromClient = ctx.request.body.nonce
    console.log(nonceFromClient)

    gateway.transaction.sale({
      amount: "10.00",
      paymentMethodNonce: 'fake-valid-nonce',
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
      console.log('PAID')
    });
  }) 

module.exports = router