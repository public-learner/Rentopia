import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import braintree from 'braintree-web-drop-in'
import PropTypes from 'prop-types'
import BraintreeDropin from 'braintree-dropin-react'
import { TOKENIZATION_KEY } from '../../../braintreeConfig'
import { tenantPayment } from '../../actions/paymentGetters'


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
    this.props.tenantPayment(payload)
    // send payload aka nonce to server. 
    // server should use nonce with a braintree sdk to charge card
  }

  render () {
    return (
      <div className="paymentForm">
        <BraintreeDropin
          braintree={braintree}
          authorizationToken={TOKENIZATION_KEY}
          handlePaymentMethod={this.handlePaymentMethod.bind(this)}
          renderSubmitButton={renderSubmitButton}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({tenantPayment: tenantPayment}, dispatch)
}

export default connect(null, mapDispatchToProps)(PaymentForm)