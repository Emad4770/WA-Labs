// import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Table } from "react-bootstrap";

function SideBar(props) {
  return <FilterTable filters={props.filters} />;
}

function FilterTable(props) {
  return (
    <Table className="table table-hover">
      <tbody>
        {props.filters.map((filter, index) => (
          <FilterRow filter={filter} key={index} />
        ))}
      </tbody>
    </Table>
  );
}

function FilterRow(props) {
  return (
    <tr>
      <td>{props.filter}</td>
    </tr>
  );
}

export default SideBar;
