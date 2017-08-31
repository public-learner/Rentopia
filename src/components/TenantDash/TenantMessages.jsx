import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TenantSidebar from './TenantSidebar.jsx';
import Payment from '../Payment/Payment.jsx';
import Modal from 'react-modal';

// import { bindActionCreators } from 'redux';
const customStyles = {
  content : {
    top             : '50%',
    left            : '50%',
    right           : '70%',
    bottom          : 'auto',
    marginRight     : '-50%',
    transform       : 'translate(-50%, -50%)',
    maxHeight       : '500px', // This sets the max height
    maxWidth        : '700px',
    overflow        : 'scroll', // This tells the modal to scroll
    border          : '1px solid black',
    //borderBottom          : '1px solid black', // for some reason the bottom border was being cut off, so made it a little thicker
    borderRadius    : '0px'
  }
};

const hvrDesrpCDN = 'https://stackoverflow.com/questions/3559467/description-box-on-mouseover'

class TenantMessages extends Component {
  constructor() {
    super()

    this.state = {
      modalIsOpen: true,
      sendTo: ''
    }
    this.openModal = this.openModal.bind(this)
  }

  componentDidMount() {
    this.setState({
      modalIsOpen: false
    })
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
  	return (
      <div>
        <h2 className="pageTitle"> Your Messages </h2>
        <TenantSidebar />

        <div id="tenantWindow">
          <button href="`${hvrDesrpCDN}`" title="Send new message" id="newMessage" onClick={this.openModal}><i className="fa fa-envelope fa-fw" aria-hidden="true"></i></button>
          <p> {this.props.media} </p>
        </div>

        <div id="centerTenantDash">
     
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          style={customStyles}
          contentLabel="Payment Modal"
        > 
        	<div>
        		<p>From: {this.props.email}</p>
        		<p>To: {this.state.sendTo}</p>
        	</div>
        </Modal>
      </div>
  	)
  }
}

function mapStateToProps(state) {
	return {
		tenantRentDue: state.tenantData && state.tenantData.rent,
    media: state.selectedTenantMedia,
    email: state.user && state.user.email,
	}
}

export default connect(mapStateToProps)(TenantMessages)

