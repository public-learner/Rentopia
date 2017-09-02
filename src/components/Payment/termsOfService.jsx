import React from 'react'

class TermsOfService extends React.Component {

  render() {
    return(
      <div className="termsOfService">
        <p>Rentopia uses Braintree, a division of PayPal, Inc. (Braintree) for
        payment processing services. By using the Braintree payment processing services you
        agree to the Braintree Payment Services Agreement available at
        <a target="_blank" href="https://www.braintreepayments.com/legal/gateway-agreement"> https://www.braintreepayments.com/legal/gateway-agreement</a>, and the
        applicable bank agreement available at
        <a target="_blank" href="https://www.braintreepayments.com/legal/bank-agreement"> https://www.braintreepayments.com/legal/bank-agreement.</a>
        </p>
      </div>
    )
  }
}

export default TermsOfService