
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import LandlordHeader  from './LandlordHeader.jsx'
import Properties  from './LandlordProperties.jsx'
import Property  from './LandlordPropertyComponent.jsx'
import Tenants  from './LandlordTenants.jsx'
import Profile from '../UserProfile/UserProfile.jsx'

class LandlordDashboard extends React.Component {

  render() {
    return (
      <div>
        <LandlordHeader />
        <main>
          <Switch>
            <Route exact path='/proprietor/properties' component={Properties} />
            <Route path='/proprietor/properties/:id' component={Property} />
            <Route path='/proprietor/tenants' component={Tenants} />
            <Route path='/proprietor/profile' component={Profile} />
          </Switch>
        </main>
        <p> {this.props.media} </p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    media: state.selectedLandlordMedia
  }
}

export default connect(mapStateToProps)(LandlordDashboard)
