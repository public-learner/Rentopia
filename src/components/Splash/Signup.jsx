import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import { signupUser } from '../../actions/authGetters'

class Signup extends React.Component {

  handleSignup(e) {
    e.preventDefault()
    this.props.signupUser({
      name: e.target.name.value,
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
      <div>
        <form className="signupForm" onSubmit={this.handleSignup.bind(this)}>
          <input className="signupInput" name="name" placeholder="Full Name"></input>
          <input className="signupInput" name="email" placeholder="Email"></input>
          <input className="signupInput" name="password" type="password" placeholder="Password"></input>
          <div className="signupSelect">
            <label>User Type</label>
            <br/>
            <select name="userType">
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
            </select>
          </div>
          <button className="signupButton" type="submit">Create Account</button>
        </form>
        <div>Have an account? <Link to='/' className="link">Log in</Link></div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({signupUser: signupUser}, dispatch)
}

export default connect(null, mapDispatchToProps)(Signup)