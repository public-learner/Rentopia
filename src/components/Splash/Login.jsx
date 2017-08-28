import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import { loginUser } from '../../actions/authGetters'
import Payment from '../Payment/Payment.jsx'

class Login extends React.Component {

  handleLogin(e) {
    e.preventDefault()
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
        <Payment />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loginUser: loginUser}, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)