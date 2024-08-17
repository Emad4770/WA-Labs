// import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

function SideBar(props) {
  const filters = props.filters.map((filter, i) => (
    <tr key={i}>
      <td>
        {filter} {i}
      </td>
    </tr>
  ));
  return (
    <Table className="table table-hover">
      <tbody>{filters}</tbody>
    </Table>
  );
}

SideBar.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SideBar;
