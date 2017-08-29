import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class UserProfile extends Component {
	render() {
		return (
			<div>
			OH HERRO. 
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {

	}
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({selectedMedia}, dispatch)
// }

export default connect(mapStateToProps)(UserProfile)