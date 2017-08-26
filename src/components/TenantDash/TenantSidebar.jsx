import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectedMedia } from '../../actions/tenantDashboardGetters';

class TenantSideBar extends Component {

	componentDidMount() {

	}

	renderMessages() {
		return this.props.tenantMessages.map((mesg, i) => {
			return (
				<tr key={i} onClick={() => this.props.selectedMedia(mesg)}> {mesg} </tr>
			)
		})
	}

	renderDocs() {
		return this.props.tenantDocs && this.props.tenantDocs.map((doc, i) => {
			return (
				<tr key={i} onClick={() => this.props.selectedMedia(doc)}> {doc} </tr>
			)
		})
	}

	render() {
		return (
			<div style={{width: "20%", height: "400px", border: "1px solid gray", float: "left"}}>
			  <div> <h4>Messages</h4>
	        <div>{this.props.tenantMessages && this.renderMessages()}</div>
				</div>
				<div> <h4>Documents</h4>
				  <div>{this.props.tenantDocs && this.renderDocs()}</div>
				</div>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectedMedia}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TenantSideBar);