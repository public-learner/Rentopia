import React, { Component } from 'react'

class UserProfile extends Component {
	render() {
		return (
			<div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {

	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectedMedia}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)