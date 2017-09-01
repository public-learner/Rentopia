import React from 'react'
import { connect } from 'react-redux'


function mapStateToProps(state, match) {
  const property_id = Number(match.match.params.id);
  return {
    property: state.landlordProperties.filter(property => property.property_id = property_id)[0],
    tenants: state.landlordTenants
  }
}

class Property extends React.Component {

  render() {
    const property = this.props.property;
    return (
      <div>
        <h2 className="pageTitle">{property.property_name}</h2>
        <p>Address: {property.address}</p>
        <p>City: {property.city}</p>
        <p>State: {property.state_abbrv}</p>
        <h3>Tenants</h3>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Property)
