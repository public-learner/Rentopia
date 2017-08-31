import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Header extends Component {
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
            <Link to='/proprietor/properties' className="link">Properties</Link>
          </NavItem>
          <NavItem>
            <Link to='/proprietor/tenants' className="link">Tenants</Link>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown title="Profile/Logout" id="nav-dropdown" onToggle={this.toggleDropdown.bind(this)}
            open={this.state.dropdownIsOpen}>
            <Link className="dropDownMenu" to="/profile"> Your Profile </Link><br/>
            <Link className="dropDownMenu" to="/logout"> Logout </Link>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
};

export default Header;
