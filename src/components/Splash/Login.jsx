import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import { signinUser } from '../../actions/authGetters'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleSignin(e) {
    e.preventDefault()
    this.props.signinUser({
      email: e.target.email.value,
      password: e.target.password.value
    })

    e.target.email.value = ''
    e.target.password.value = ''
  }

  render() {
    return (
      <div className="loginForm">
        <form onSubmit={this.handleSignin.bind(this)}>
          <label>Email Address</label><input ref="emailInput" name="email"></input>
          <label>Password</label><input ref="passwordInput" name="password" type="password"></input>
          <button type="submit">Submit</button>
        </form>
        <div>Don't have an account? <Link to='/signup' className="link">Signup</Link></div>
      </div>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({signinUser: signinUser}, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)