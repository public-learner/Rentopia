import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import { logoutUser } from '../../actions/authGetters'

class TenantNavBar extends Component {
    constructor(props) {
    super() 

    this.state = {
      dropdownIsOpen: false
    }
  }

  toggleDropdown() {
    this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen }
  )}

  handleLogout() {
    this.props.logoutUser()
    // this.props.history.push("/")
  }

  render() {
    return (
      <Navbar className="navbar" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand className="brand">
            <Link to="/tenant">Rentopia</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem>
            <Link to='/tenant/payments' className="link">Payments</Link>
          </NavItem>
          <NavItem>
            <Link to='/tenant/messages' className="link">Messages</Link>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown title="Profile/Logout" id="nav-dropdown" onToggle={this.toggleDropdown.bind(this)}
            open={this.state.dropdownIsOpen}>
            <Link onClick={this.toggleDropdown.bind(this)} className="dropDownMenu" to="/tenant/profile"> Your Profile </Link><br/>
            <Link className="dropDownMenu" onClick={this.handleLogout.bind(this)} to="/" > Logout </Link>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logoutUser}, dispatch)
}

export default connect(null, mapDispatchToProps)(TenantNavBar)