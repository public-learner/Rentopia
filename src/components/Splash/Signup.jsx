import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Redirect } from 'react-router-dom'

import { signupUser } from '../../actions/authGetters'

class Signup extends React.Component {

  handleSignup(e) {
    e.preventDefault()
    let isLandlord = (e.target.userType.value === 'landlord')
    this.props.signupUser({
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      isLandlord: isLandlord        
    })
    e.target.name.value = ''
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
        {this.props.loggedIn ? (this.props.isLandlord ? <Redirect to="/proprietor" /> : <Redirect to="/tenant" />) : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLandlord: state.user && state.user.is_landlord,
    loggedIn: state.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({signupUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

