import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SplashNavBar from './SplashNavBar.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'

class Splash extends React.Component {

  render() {
    return (
      <div>
        <main>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={Signup} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default Splash