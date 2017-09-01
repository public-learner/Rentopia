
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import LandlordNavBar  from './LandlordHeader.jsx'
import Properties  from './LandlordProperties.jsx'
import Property  from './LandlordPropertyComponent.jsx'
import Tenants  from './LandlordTenants.jsx'
import Profile from '../UserProfile/UserProfile.jsx'

class LandlordDashboard extends React.Component {

  render() {
    return (
      <div>
        <h2> Manage your estate </h2>
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
