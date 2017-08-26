import React from 'react'
// import landlord main component
// import tenant main component
import Splash from './Splash/splash.jsx'
import Tenant from './TenantDash/TenantDashboard.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      loggedIn: false
    }
  }

  render() {

    return(
      <div>
        {!this.state.loggedIn && <Splash />}
<<<<<<< HEAD
<<<<<<< HEAD
        <Tenant />
=======
        <Blah />
>>>>>>> setting up routing for either login or signup
=======
>>>>>>> server connected to webpack
      </div>
    )
  }
}

export default App  