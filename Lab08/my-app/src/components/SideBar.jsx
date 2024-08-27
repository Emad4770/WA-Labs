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

function FilterRow({ filter, selectFilter }) {
  return (
    <tr>
      <td onClick={() => selectFilter(filter)}>{filter}</td>
    </tr>
  );
}

export default SideBar;
