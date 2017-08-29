import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = () => (
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
      <NavItem>
        <Link className="logout" to={'/logout'}>Logout</Link>
      </NavItem>
    </Nav>
  </Navbar>
);

export default Header;
