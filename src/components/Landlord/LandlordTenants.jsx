import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const tenants = [
    {name: "Beth Smith", property: "RnM", rent: 600, due:"09/01/2017", message: "false"},
    {name: "Rick Sanchez", property: "RnM", rent: 0, due:"09/01/2017", message: "false"},
    {name: "Morty Smith", property: "RnM", rent: 200, due:"09/01/2017", message: "false"},
    {name: "Summer Smith", property: "RnM", rent: 200, due:"09/01/2017", message: "false"},
    {name: "Jerry Smith", property: "Fleabag Motel", rent: 200, due:"09/01/2017", message: "false"},
    {name: "Snuffles", property: "RnM", rent: 100, due:"09/01/2017", message: "false"},
    {name: "Homer Simpson", property: "742 Evergreen Terrace", rent: 500, due:"09/01/2017", message: "false"},
    {name: "Marge Simpson", property: "742 Evergreen Terrace", rent: 500, due:"09/01/2017", message: "true"},
    {name: "Bart Simpson", property: "742 Evergreen Terrace", rent: 130, due:"09/01/2017", message: "false"},
    {name: "Lisa Simpson", property: "742 Evergreen Terrace", rent: 100, due:"09/01/2017", message: "false"},
    {name: "Abe Simpson", property: "Retirement Home", rent: 1500, due:"09/01/2017", message: "false"},
    {name: "Snowball III", property: "742 Evergreen Terrace", rent: 30, due:"09/01/2017", message: "false"},
    {name: "Santa's Little Helper", property: "742 Evergreen Terrace", rent: 60, due:"09/01/2017", message: "false"}
];
// function addTenant(quantity) {
//   const startId = tenants.length;
//   for (let i = 0; i < quantity; i++) {
//     const id = startId + i;
//     tenants.push({
//       id: id,
//       name: 'Item name ' + id,
//       price: 2100 + i
//     });
//   }
// }
// addTenant(5);

class Tenants extends React.Component {

  render() {
    return (
      <div>
      <h2>Tenants</h2>
      <BootstrapTable data={ tenants } striped={ true } hover={ true } condensed={ true }>
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

export default Tenants
