import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import { logoutUser } from '../../actions/authGetters'

class SplashNavBar extends React.Component {

  handleLogout() {
    this.props.logoutUser()
    this.props.history.push("/")
  }

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
            <Link className="dropDownMenu" onClick={this.handleLogout.bind(this)} to="/" > Logout </Link>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logoutUser}, dispatch)
}

export default connect(null, mapDispatchToProps)(SplashNavBar)