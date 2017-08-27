import React from 'react'

class Signup extends React.Component {

  handleSignup(e) {
    e.preventDefault()
    console.log('hello')

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
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Signup