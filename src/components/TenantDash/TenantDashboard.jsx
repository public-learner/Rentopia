import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// import { bindActionCreators } from 'redux';
import TenantSidebar from './TenantSidebar.jsx';

class TenantDashboard extends Component {

  // I will be populating the Messages and Docs data from Database

  render() {
  	return (
      <div>
        <TenantSidebar />
        <div style={{marginRight: "300px", float: "right", width: "50%", height: "350px", border: "1px solid gray"}}>
          <h3> Header </h3>
          <p> {this.props.media} </p>
        </div>
          <p style={{width: "100%", float: "right", textAlign: "center"}}>
            Rent Due: {this.props.tenantRentDue}
            <button> Make Payment </button>
          </p>

          <Switch>
            <Route path='/signup' component={Signup} />
          </Switch>
      </div>
  	)
  }
}
// <Link to='/signup' className="link">Signup</Link>
function mapStateToProps(state) {
	return {
		tenantRentDue: state.tenantRentDue,
    media: state.selectedTenantMedia
	}
}

export default connect(mapStateToProps)(TenantDashboard)