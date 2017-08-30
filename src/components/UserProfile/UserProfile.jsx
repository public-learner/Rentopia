import React, { Component } from 'react'
<<<<<<< HEAD

class UserProfile extends Component {
	render() {
		return (
			<div>
			</div>
		)
	}
=======
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setEditedProfileInfo } from '../../actions/setEditedProfileInfo';

class UserProfile extends Component {
	constructor() {
		super()

		this.state = {
			editing: false,
			confirmCount: 0
		}
	}

	handleSubmit(event) {
		event.preventDefault()

		let name = event.target.name.value 
		let email = event.target.email.value 
		let confirm = event.target.confirm.value

		if (email === confirm && email !== '') {
			this.props.setEditedProfileInfo({name: name, email: email}, this.props.userId)
			event.target.name.value = ''
			event.target.email.value = ''
			event.target.confirm.value = ''
			this.setState({
				confirmCount: 0,
				editing: false
			})
		} else {
			alert("those emails don't match. You done messed up boiieee!!!")
		}
	}

	toggleConfirmEmail(e) {
		if (this.state.confirmCount === 0) {
	    document.getElementById('confirmEmail').value = ''
	    this.setState({
	    	confirmCount: 1
	    })
  	}
	}

	editForm() {
		return (
			<div className="editForm">
				<form onSubmit={this.handleSubmit.bind(this)}>
				  <label>Name</label>
				  <input type="text" className="form-control" name="name" defaultValue={this.props.name}/>
					<br/>
				  <label>Email address</label>
				  <input onKeyPress={this.toggleConfirmEmail.bind(this)} type="email" className="form-control" name="email" defaultValue={this.props.email}/>
				  <small className="form-text text-muted">We'll never share your email with anyone else.</small>
					<br/>
				  <label>Confirm email</label>
				  <input id="confirmEmail" type="email" className="form-control" name="confirm" defaultValue={this.props.email}/>
					<br/>
					<button className="paymentForm"> Save Changes </button>
				</form>
			</div>
		)
	}

	toggleEdit() {
		this.setState({editing: !this.state.editing})
	}

	render() {
		return (
		<div>
			<button id="profileEditButton" onClick={this.toggleEdit.bind(this)} type="button" className="btn btn-secondary"> Edit </button>
				<div className="editForm">
					{!this.state.editing ?
						<div className="editForm">
								<p>Name: {this.props.name}</p>
								<p>Email: {this.props.email}</p>
						</div>
					: 
						this.editForm.bind(this)()}
				</div>
		</div>
		)
	}
>>>>>>> 053ccb6ad529af1dee67465910f216b1b477a5d1
}

function mapStateToProps(state) {
	return {
<<<<<<< HEAD

=======
		name: state.user && state.user.user_name,
		email: state.user && state.user.email,
		userId: state.user && state.user.user_id
>>>>>>> 053ccb6ad529af1dee67465910f216b1b477a5d1
	}
}

function mapDispatchToProps(dispatch) {
<<<<<<< HEAD
  return bindActionCreators({selectedMedia}, dispatch)
=======
  return bindActionCreators({setEditedProfileInfo}, dispatch)
>>>>>>> 053ccb6ad529af1dee67465910f216b1b477a5d1
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)