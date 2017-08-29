import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Dropdown from 'react-simple-dropdown';
import { DropdownTrigger } from 'react-simple-dropdown';
import { DropdownContent } from 'react-simple-dropdown';

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
      <NavItem>
        <Dropdown>
          <DropdownTrigger>Profile</DropdownTrigger>
          <DropdownContent>
            <img src="avatar.jpg" /> Username
            <ul>
              <Link className="logout" to={'/logout'}>Logout</Link>
              <Link className="logout" to={'/profile'}>Your Profile</Link>
            </ul>
          </DropdownContent>
        </Dropdown>
      </NavItem>
    </Nav>
  </Navbar>
)

export default SplashNavBar
// <Link className="logout" to={'/logout'}>Logout</Link>