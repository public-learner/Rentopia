import React from 'react'

class Signup extends React.Component {

  render() {
    return (
      <div className="signupForm">
        <form>
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