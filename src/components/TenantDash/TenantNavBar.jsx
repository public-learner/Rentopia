import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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

  render() {
    return (
      <Navbar className="navbar" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand className="brand">
            <Link to="/">Rentopia</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem>
            <Link to='/tenant/dashboard' className="link">Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link to='/payments' className="link">Payments</Link>
          </NavItem>
          <NavItem>
            <Link to='/tenant/messages' className="link">Messages</Link>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown title="Profile/Logout" id="nav-dropdown" onToggle={this.toggleDropdown.bind(this)}
            open={this.state.dropdownIsOpen}>
            <Link onClick={this.toggleDropdown.bind(this)} className="dropDownMenu" to="/tenant/profile"> Your Profile </Link><br/>
            <Link onClick={this.toggleDropdown.bind(this)} className="dropDownMenu" to="/"> Logout </Link>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
};

export default TenantNavBar;