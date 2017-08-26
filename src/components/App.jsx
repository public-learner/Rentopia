import React from 'react'
// import landlord main component
// import tenant main component
import Splash from './Splash/SplashMain.jsx'
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
        <Tenant />
      </div>
    )
  }
}

export default App  