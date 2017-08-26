import React, { Component } from 'react';
import { connect } from 'react-redux';

class TenantSideBar extends Component {

	componentDidMount() {
		console.log('hhheeeerrrrooooo')
	}
	render() {
		return (
			<div>
			YOOOOOO
			</div>
		)
	}
}

function mapStateToProps(state) {
	return{
		tenantMessages: state.tenantMessages,
		tenantDocs: state.tenantDocs
	}
}

export default connect(mapStateToProps)(TenantSideBar);