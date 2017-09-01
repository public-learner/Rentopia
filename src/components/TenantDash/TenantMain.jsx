import React from 'react'
import { Switch, Route } from 'react-router-dom'
import TenantNavBar  from './TenantNavBar.jsx'
import TenantDashboard from './TenantDashboard.jsx'
import Profile from '../UserProfile/UserProfile.jsx'
import TenantMessages from './TenantMessages.jsx'
import Login from '../Splash/Login.jsx'


class TenantMain extends React.Component {

  render() {
    return (
      <div>
          <TenantNavBar />
          <main>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/tenant/dashboard' component={TenantDashboard} />
            <Route exact path='/tenant/profile' component={Profile} />
            <Route exact path='/tenant/messages' component={TenantMessages} />
            <Route path='/tenant' component={TenantDashboard} />
          </Switch>
          </main>
      </div>
    )
  }
}

export default TenantMain
