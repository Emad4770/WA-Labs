/* eslint-disable react/prop-types */

import { Table } from "react-bootstrap";

function SideBar(props) {
  return (
    <FilterTable filters={props.filters} selectFilter={props.selectFilter} />
  );
}

function FilterTable(props) {
  return (
    <Table className="table table-hover">
      <tbody>
        {props.filters.map((filter, index) => (
          <FilterRow
            filter={filter}
            key={index}
            selectFilter={props.selectFilter}
          />
        ))}
      </tbody>
    </Table>
  );
}

function FilterRow(props) {
  return (
    <tr>
      <td onClick={() => props.selectFilter(props.filter)}>{props.filter}</td>
    </tr>
  );
}

export default SideBar;
