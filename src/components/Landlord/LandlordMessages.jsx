import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import MessagesSidebarLandlord from './MessageSidebarLandlord.jsx';
import Modal from 'react-modal';
import { sendMessage } from '../../actions/messageGetters';
import { sortMessages, setCurrentConvo } from '../../actions/sortMessages';
import { sortTenantsByProp } from '../../actions/sortTenantsByProp';

const hvrDesrpCDN = 'https://stackoverflow.com/questions/3559467/description-box-on-mouseover'

class LandlordMessages extends Component {
  constructor() {
    super()
    
    this.handleSendTo = this.handleSendTo.bind(this)
  }

  componentDidMount() {
    this.props.sortTenantsByProp(this.props.landlordTenants)
    // var elem = document.getElementById('tenantWindow');
    // elem.scrollTop = elem.scrollHeight;
    this.props.sortMessages(this.props.messages, this.props.userId)
    this.setState({
      modalIsOpen: false
    })
  }

  componentWillUpdate() {
    var elem = document.getElementById('tenantWindow');
    elem.scrollTop = elem.scrollHeight;
  }

  handleSendTo(e) {
    e.preventDefault()
    if (this.props.mesgRecipient === null) {
      alert('Must add recipient before sending you big dummy!')
    } else {
      var obj = {
        message_content: e.target.message.value,
        recipient_id: this.props.mesgRecipient,
        sender_id: this.props.userId
      }
      e.target.message.value = ''
      this.props.sendMessage(obj)
        .then(() => {
          this.props.sortMessages(this.props.messages, this.props.userId)
        })
        .then(()=>{
          var recip = this.props.mesgRecipient
          this.props.setCurrentConvo(this.props.sortedMesgs[recip], recip, this.props.convoPersonsName)
        })
  
    }
  }

  messageContent(content, date, side, sideFull, style) {
    return (
      <div className={sideFull}>
        <div className={style}>{date}</div>
        <div className={side}>{content}</div>
      </div>
    )
  }

  renderConvo() {
    // *** Sender_id needs to be the actual sender. That will be set up with a get request
    return (
      <div>
        {this.props.currentConvo.map(v => {
            var date = new Date(v.created_date).toLocaleDateString()
            if (v.sender_id === this.props.userId) { 
              return this.messageContent(v.message_content, date, 'mesRight', 'messageRight', 'mesRight dateStyle')
            } else {
              return this.messageContent(v.message_content, date, 'mesLeft', 'messageLeft', 'mesLeft dateStyle')
            }
          }
        )}
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2 className="pageTitle"> Your Messages </h2>
        <div className="convoPersName"> <h3>{this.props.convoPersonsName} </h3></div>
        <MessagesSidebarLandlord />
        <div id="tenantWindow">
          <div>{this.renderConvo()}</div>
        </div>
        <div className="newMessage">
          <form onSubmit={this.handleSendTo.bind(this)}>
            <input className="centerMessage" type="text" name="message" placeholder="Type in me!"/>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.user && state.user.user_id,
    currentConvo: state.setCurrentConvo,
    mesgRecipient: state.messageRecipient,
    userId: state.user && state.user.user_id,
    userName: state.user && state.user.user_name,
    messages: state.messages,
    sortedMesgs: state.sortedMessages,
    landlordId: state.landlordData && state.landlordData.landlord_id,
    landlordTenants: state.landlordTenants,
    convoPersonsName: state.convoPersonsName
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({sendMessage, sortMessages, setCurrentConvo, sortTenantsByProp}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LandlordMessages)

