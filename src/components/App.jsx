import React from 'react'
// import landlord main component
// import tenant main component
<<<<<<< HEAD
import Splash from './Splash/splash.jsx'
import Tenant from './TenantDash/TenantDashboard.jsx'
=======
import Splash from './Splash/SplashMain.jsx'
import Blah from './Blah.jsx'
>>>>>>> setting up routing for either login or signup

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
        <Tenant />
=======
        <Blah />
>>>>>>> setting up routing for either login or signup
      </div>
    )
  }
}

export default App  