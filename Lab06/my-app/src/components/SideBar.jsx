// import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

function SideBar(props) {
  return (
    <>
      <Table className="table table-hover" responsive>
        <tbody>
          {props.filters.map((filter, i) => (
            <tr key={i}>
              <td>{filter}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

SideBar.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SideBar;