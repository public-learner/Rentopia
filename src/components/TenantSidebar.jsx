import React from 'react';
import { connect } from 'react-redux';

class TenantSideBar extends Component {
	render() {
		return (
			<div>
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