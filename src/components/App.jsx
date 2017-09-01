import React from 'react'
// import landlord main component
// import tenant main component
import Splash from './Splash/SplashMain.jsx'
import { getMessages, getDocs, getRentDue } from '../actions/tenantDashboardGetters';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Payment from './Payment/Payment.jsx';

class App extends React.Component {
  render() {
    return(
      <div>
        <Splash />
      </div>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({getMessages, getDocs, getRentDue}, dispatch)
// }

export default App

// export default connect(null, mapDispatchToProps)(App) 
