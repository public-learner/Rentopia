import React from 'react'
// import landlord main component
// import tenant main component
import Splash from './Splash/splash.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      loggedIn: false
    }
  }

  render() {

    return(
      <div>
        {!this.state.loggedIn && <Splash />}
      </div>
    )
  }
}

export default App  