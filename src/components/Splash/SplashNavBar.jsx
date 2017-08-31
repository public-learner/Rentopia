import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SplashNavBar = () => (
  <Navbar className="navbar" inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand className="brand">
        <Link to="/">Rentopia</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem>
        <Link to='/proprietor' className="link">Landlord Dashboard</Link>
      </NavItem>
      <NavItem>
        <Link to='/tenant' className="link">Tenant Dashboard</Link>
      </NavItem>
      <NavItem>
        <Link to='/paymentsetup' className="link">Payment Setup</Link>
      </NavItem>
    </Nav>
    <Nav pullRight>
      <NavDropdown title="Profile/Logout" id="nav-dropdown">
        <Link className="dropDownMenu" to="/profile"> Your Profile </Link><br/>
        <Link className="dropDownMenu" to="/logout"> Logout </Link>
      </NavDropdown>
    </Nav>
  </Navbar>
)

export default SplashNavBar