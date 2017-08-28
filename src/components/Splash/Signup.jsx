import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import { signupUser } from '../../actions/authGetters'

class Signup extends React.Component {

  handleSignup(e) {
    e.preventDefault()
    this.props.signupUser({
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      userType: e.target.userType.value        
    })
    e.target.firstName.value = ''
    e.target.lastName.value = ''
    e.target.email.value = ''
    e.target.password.value = ''
  }

  render() {
    return (
      <div className="signupForm">
        <form onSubmit={this.handleSignup.bind(this)}>
          <label>First Name</label><input ref="firstNameInput" name="firstName"></input>
          <label>Last Name</label><input ref="lastNameInput" name="lastName"></input>
          <label>Email Address</label><input ref="emailInput" name="email"></input>
          <label>Password</label><input ref="passwordInput" name="password" type="password"></input>
          <label>User Type</label>
            <select name="userType">
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
            </select>
          <button type="submit">Submit</button>
        </form>
        <div>Have an account? <Link to='/' className="link">Signin</Link></div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({signupUser: signupUser}, dispatch)
}

export default connect(null, mapDispatchToProps)(Signup)