import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SplashNavBar from './SplashNavBar.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import LandlordDashboard from '../Landlord/LandlordDashboard.jsx'
import TenantDashboard from '../TenantDash/TenantDashboard.jsx'
import PaymentSetup from '../Payment/PaymentSetup.jsx'

class Splash extends React.Component {

  render() {
    return (
      <div>
        <main>
          <SplashNavBar />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/proprietor' component={LandlordDashboard} />
            <Route path='/tenant' component={TenantDashboard} />
            <Route path='/paymentsetup' component={PaymentSetup} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default Splash
