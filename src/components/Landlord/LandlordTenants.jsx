import React from 'react'
import { connect } from 'react-redux'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function mapStateToProps(state) {
  return {
    tenants: state.landlordTenants
  }
}

class Tenants extends React.Component {


  render() {
    return (
      <div>
      <h2>Tenants</h2>
      <BootstrapTable data={ this.props.tenants } striped={ true } hover={ true } condensed={ true }>
        <TableHeaderColumn dataField='name' dataSort={ true } isKey={ true }>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='property' dataSort={ true }>Property</TableHeaderColumn>
        <TableHeaderColumn dataField='rent' dataSort={ true }>Rent</TableHeaderColumn>
        <TableHeaderColumn dataField='due' dataSort={ true }>Due</TableHeaderColumn>
        <TableHeaderColumn dataField='message' dataSort={ true }>Message</TableHeaderColumn>
      </BootstrapTable>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Tenants)
