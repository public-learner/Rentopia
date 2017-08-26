import React from 'react'
// import landlord main component
// import tenant main component
import Splash from './Splash/SplashMain.jsx'
import Tenant from './TenantDash/TenantDashboard.jsx'
import { getMessages, getDocs, getRentDue } from '../actions/tenantDashboardGetters';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      loggedIn: false
    }
  }

  componentWillMount() {

  }

  render() {

    return(
      <div>
        {!this.state.loggedIn && <Splash />}
      </div>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({getMessages, getDocs, getRentDue}, dispatch)
// }

export default App

// export default connect(null, mapDispatchToProps)(App) 