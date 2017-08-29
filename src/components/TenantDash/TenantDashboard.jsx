import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ModalContainer, ModalRoute } from 'react-router-modal';
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


class TenantDashboard extends Component {
  constructor() {
    super()

    this.state = {
      modalIsOpen: false
    }
  }
  // I will be populating the Messages and Docs data from Database
  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  // <Link to='/paymentModal' className="link">Make Payment</Link>
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
            <button onClick={this.openModal.bind(this)}> Make Payment </button>
          </p>

            <ModalRoute component={Payment} path='/paymentModal'/>
          
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal.bind(this)}
              style={customStyles}
              contentLabel="Payment Modal"
            > 
              <Payment />
            </Modal>
      </div>
  	)
  }
}

function mapStateToProps(state) {
	return {
		tenantRentDue: state.tenantRentDue,
    media: state.selectedTenantMedia
	}
}

export default connect(mapStateToProps)(TenantDashboard)