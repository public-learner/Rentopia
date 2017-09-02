import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LandlordNavBar  from './LandlordHeader.jsx'
import LandlordDashboard from './LandlordDashboard.jsx'
import Profile from '../UserProfile/UserProfile.jsx'
import Properties  from './LandlordProperties.jsx'
import LandlordPropertyComponent from './LandlordPropertyComponent.jsx'
import Login from '../Splash/Login.jsx'
import Tenants  from './LandlordTenants.jsx'
import PaymentSetup from '../Payment/PaymentSetup.jsx'
import Transactions from './LandlordTransactions.jsx'
import TermsOfService from '../Payment/TermsOfService.jsx'

class LandlordMain extends React.Component {

  render() {
    return (
      <div>
          <LandlordNavBar />
          <main>
          <Switch>
            <Route exact path='/proprietor/dashboard' component={LandlordDashboard} />
            <Route exact path='/proprietor/profile' component={Profile} />
            <Route exact path='/proprietor/properties' component={Properties} />
            <Route path='/proprietor/properties/:id' component={LandlordPropertyComponent} />
            <Route exact path='/proprietor/tenants' component={Tenants} />
            <Route exact path='/proprietor/payments' component={Transactions} />
            <Route exact path='/proprietor/paymentsetup' component={PaymentSetup} />
            <Route exact path='/proprietor/termsofservice' component={TermsOfService} />
            <Route path='/proprietor' component={LandlordDashboard} />
          </Switch>
          </main>
      </div>
    )
  }
}

export default LandlordMain