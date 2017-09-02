import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TenantSidebar from './TenantSidebar.jsx';
import PaymentForm from '../Payment/PaymentForm.jsx';
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
    maxHeight       : '600px',
    minHeight       : '400px', // This sets the max height
    width           : '600px',
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
      sendTo: '',
      message: ''
    }
    this.openModal = this.openModal.bind(this)
    this.handleSendTo = this.handleSendTo.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.deleteMessage = this.deleteMessage.bind(this)
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

  handleSendTo(contact) {
  	this.setState({sendTo: contact});
  }

  sendMessage() {
  	let message = this.state.message;
  	let sendTo = this.state.sendTo;

  	this.props.sendMessage()
  }

  deleteMessage() {
  	document.getElementById('messageTextInput').value = ''
  	this.setState({
  		message: '',
  		sendTo: {}
  	})
  }

  keyPress() {
  	var message = document.getElementById('messageTextInput').value
  	this.setState({message: message})
  }

  render() {
  	return (
      <div>
        <h2 className="pageTitle"> Your Messages </h2>
        <TenantSidebar />

        <div id="tenantWindow">
          <button href="`${hvrDesrpCDN}`" title="Send new message" className="messageIcons" onClick={this.openModal}><i className="fa fa-envelope fa-fw" aria-hidden="true"></i></button>
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
        	  <button onClick={this.sendMessage} className="messageIcons"><i className="fa fa-paper-plane-o fa-fw" aria-hidden="true"></i></button>
        	  <button className="messageIcons"><i className="fa fa-trash-o fa-fw" aria-hidden="true"></i></button>
        		<p>From: {this.props.email}</p>
        		<p>To: {this.state.sendTo.email}</p>
        		<div className="dropdown">
      		    <button className="btn btn-link dropdown-toggle" type="button" data-toggle="dropdown">Add Contact
      		    <span className="caret"></span></button>
      		    <ul className="dropdown-menu">
      		      {this.props.propTenants.map(v => {
      		      	return (<li><a onClick={() => {this.handleSendTo(v)}}>{v.email}</a></li>)
      		      })}
      		    </ul>
        		</div>
        		<textarea onKeyPress={this.keyPress} id="messageTextInput" className="messageInput" rows="15" cols="60"> </textarea>
        	</div>
        </Modal>
      </div>
  	)
  }
}

function mapStateToProps(state) {
	return {
		tenantRentDue: state.tenantData && state.tenantData.rent,
		propTenants: [{email: 'empty', tenant_id: 5}], //state.tenantData && state.tenantData.tenants
    media: state.selectedTenantMedia,
    email: state.user && state.user.email,
	}
}

export default connect(mapStateToProps)(TenantMessages)

