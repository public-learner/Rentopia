import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/' className="link">Login</Link></li>
        <li><Link to='/signup' className="link">Signup</Link></li>
      </ul>
    </nav>
  </header>
)

export default Nav