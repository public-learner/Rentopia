import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRentDue, getMessages, getDocs} from '../actions/tenantDashboardGetters';
import TenantSidebar from './TenantSidebar';

class TenantDashboard extends Component {

  componentWillMount() {
  	const id = this.props.userId
  	this.props.getRentDue(id)
  	this.props.getMessages(id)
  	this.props.getDocs(id)
  }

  render() {
  	return (
      <div>
        <Switch>
        </Switch>
      </div>
  	)
  }
}

function mapStateToProps(state) {
	return {
		userId: state.user.userId,
		tenantRentDue: state.tenantRentDue,
		tenantMessage: state.tenantMessage,
		tenantDocs: state.tenantDocs
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({getRentDue: getRentDue, getMessages: getMessages, getDocs: getDocs}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TenantDashboard)