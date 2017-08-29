import React from 'react'
import { statesList, months, days, years } from './formHelperData'
import { submerchantCreation } from '../../actions/paymentGetters'

class PaymentSetup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bankIsSelected: true
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    let monthNum = months.indexOf(e.target.month.value) + 1

    let destination 
    let accountNum
    let routingNum
    let phoneNum
    let venmoEmail

    if (this.state.bankIsSelected) {
      destination = 'bank'
      accountNum = e.target.accountNum.value
      routingNum = e.target.routingNum.value
      phoneNum = '',
      venmoEmail = ''
    }

    if (!this.state.bankIsSelected) {
      if (e.target.venmoEmail.value !== '') {
        destination = 'email'
      } else {  
        destination = 'mobile_phone'
      }
      accountNum = ''
      routingNum = ''
      phoneNum = e.target.phoneNum.value,
      venmoEmail = e.target.venmoEmail.value
    }

    let params = {
      individual: {
        firstName: e.target.name.value.split(' ')[0],
        lastName: e.target.name.value.split(' ')[1],
        email: e.target.email.value,
        dateOfBirth: `${e.target.year.value}-${monthNum}-${e.target.day.value}`,
        address: {
          streetAddress: e.target.street.value,
          locality: e.target.city.value,
          region: e.target.state.value,
          postalCode: e.target.zip.value
        }
      },
      funding: {
        destination: destination, // can be either bank, mobile_phone, or email
        email: venmoEmail, // for venmo
        mobilePhone: phoneNum, // for venmo
        accountNumber: accountNum, //for bank
        routingNumber: routingNum // for bank
      },
      tosAccepted: true, // need to do a terms of service thing
      masterMerchantAccountId: "" // inside of braintree.config.js
    }
    console.log(params)
    submerchantCreation(params)
  }

  handleOptionChange(e) {
    console.log(e.target.value)
    console.log(this.state.bankIsSelected)

    this.setState({
      bankIsSelected: (e.target.value === 'bank')
    })
  }

  renderStates() {
    return statesList.map((usState, i) => {
      return (
        <option key={i}> {usState} </option>
      )
    })
  }

  renderMonths() {
    return months.map((month, i) => {
      return (
        <option key={i}> {month} </option>
      )
    })
  }

  renderDays() {
    return days.map((day, i) => {
      return (
        <option key={i}> {day} </option>
      )
    })
  }

  renderYears() {
    return years.map((year, i) => {
      return (
        <option key={i}> {year} </option>
      )
    })
  }

  renderBankForm() {
    return (
      <div>
        <label>Account Number</label><br/><input type="text" className="paymentInput" name="accountNum"></input><br/>
        <label>Routing Number</label><br/><input type="text" className="paymentInput" name="routingNum"></input><br/>
      </div>
    )
  }

  renderVenmoForm() {
    return (
      <div>
        <label>Email</label><br/><input className="paymentInput" name="venmoEmail"></input><br/>
        <label>Phone Number</label><br/><input type="text" className="paymentInput" name="phoneNum"></input><br/>
        <h6>* Must have a valid Venmo account</h6>
        <h6>* Please use either the email or phone number associated with your Venmo account</h6>
      </div>
    )
  }

  render() {
    return (
      <div className="paymentSetup">
        <h1>Set up your payments</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
              <h4>1. Personal Information</h4>
              <label>Full Name</label><br/><input name="name" className="paymentInput" defaultValue="Jordan Hoang"></input><br/>
              <label>E-mail address</label><br/><input name="email" className="paymentInput" defaultValue="jordan.n.hoang@gmail.com"></input><br/>
              <label>Birthday</label><br/>
              <select name="month">
                {this.renderMonths()}
              </select>
              <select name="day">
                {this.renderDays()}
              </select>
              <select name="year">
                {this.renderYears()}
              </select>
            </div>
            <div>
              <h4>2. Address</h4>
              <label>Street Address</label><br/><input name="street" className="paymentInput"></input><br/>
              <label>City</label><br/><input name="city" className="paymentInput"></input><br/>
              <label>State</label><br/>
              <select name="state">
                {this.renderStates()}
              </select>
              <br/>
              <label>Zip Code</label><br/><input name="zip" type="text" className="paymentInput"></input><br/>
            </div>
            <div>
              <h4>3. Funding Information</h4>
                <h5>Select your desired payment method</h5>
                <label>Bank </label>
                <input className="paymentOption"
                  type="radio" 
                  value="bank" 
                  checked={this.state.bankIsSelected} 
                  onChange={this.handleOptionChange.bind(this)}>
                </input>
                <label>Venmo </label>
                <input className="paymentOption"
                  type="radio" 
                  value="venmo" 
                  checked={!this.state.bankIsSelected}
                  onChange={this.handleOptionChange.bind(this)}>
                </input>
                <div>{this.state.bankIsSelected && this.renderBankForm()}</div>
                <div>{!this.state.bankIsSelected && this.renderVenmoForm()}</div>
            </div>
            <div>By clicking submit, you agree to our <a href='#'>Terms of Service</a></div>
            <button type="submit">Submit</button>
          </form>
      </div>
    )
  }
}

export default PaymentSetup
