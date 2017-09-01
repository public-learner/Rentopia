import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const transactions = [
    {id: 1, date: "01/01/2017", type: "Rent", amt: "$800"},
    {id: 2, date: "02/01/2017", type: "Rent", amt: "$800"},
    {id: 3, date: "03/01/2017", type: "Rent", amt: "$800"},
    {id: 4, date: "04/01/2017", type: "Rent", amt: "$800"},
    {id: 5, date: "05/01/2017", type: "Rent", amt: "$800"},
    {id: 6, date: "06/01/2017", type: "Rent", amt: "$800"},
    {id: 7, date: "07/01/2017", type: "Rent", amt: "$900"},
    {id: 8, date: "08/01/2017", type: "Rent", amt: "$900"},
    {id: 9, date: "09/01/2017", type: "Rent", amt: "$900"},
    {id: 10, date: "10/01/2017", type: "Rent", amt: "$900"}
];


class Transactions extends React.Component {

  render() {
    return (
      <div className="transactionsTable">
        <h2>Past Payments</h2>
        <BootstrapTable data={ transactions } striped={ true } hover={ true } condensed={ true }>
          <TableHeaderColumn dataField='id' dataSort={ true } isKey={ true }>Transaction ID</TableHeaderColumn>
          <TableHeaderColumn dataField='date' dataSort={ true }>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='type' dataSort={ true }>Type</TableHeaderColumn>
          <TableHeaderColumn dataField='amt' dataSort={ true }>Amount</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

export default Transactions
