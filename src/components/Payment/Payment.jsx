import React from 'react'
import ReactDOM from 'react-dom'
import braintree from 'braintree-web-drop-in'
import PropTypes from 'prop-types'
import BraintreeDropin from 'braintree-dropin-react'
import { TOKENIZATION_KEY } from '../../../braintreeConfig.js'

const renderSubmitButton = ({onClick, isDisabled, text}) => {
  return (
    <button onClick={onClick} disabled={isDisabled}>Pay Rent</button>
  )
}

renderSubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

class PaymentForm extends React.Component {
  handlePaymentMethod(payload) {
    console.log('payload', payload)
  }

  render () {
    const token = TOKENIZATION_KEY
    console.log(token)
    return (
      <div className="paymentForm">
        <BraintreeDropin
          braintree={braintree}
          authorizationToken={token}
          handlePaymentMethod={this.handlePaymentMethod}
          renderSubmitButton={renderSubmitButton}
        />
      </div>
    )
  }
}

export default PaymentForm