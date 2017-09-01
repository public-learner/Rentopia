import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Redirect } from 'react-router-dom'

import { loginUser, checkSession } from '../../actions/authGetters'

class Login extends React.Component {

  handleLogin(e) {
    e.preventDefault()
    console.log(this)
    this.props.loginUser({
      email: e.target.email.value,
      password: e.target.password.value
    })

    e.target.email.value = ''
    e.target.password.value = ''
  }

  render() {
    return (
      <div>
        <form className="loginForm" onSubmit={this.handleLogin.bind(this)}>
          <input className="loginInput" name="email" placeholder="Email"></input>
          <input className="loginInput" name="password" type="password" placeholder="Password"></input>
          <button className="loginButton" type="submit">Log in</button>
        </form>
        <div>Don't have an account? <Link to='/signup' className="link">Sign up</Link></div>
          {this.props.isLoggedIn && (this.props.isLandlord ? <Redirect to="/proprietor" /> : <Redirect to="/tenant" />)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    isLandlord: state.user && state.user.is_landlord,
    isLoggedIn: state.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loginUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
