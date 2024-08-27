/* eslint-disable react/prop-types */

import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function SideBar(props) {
  return <FilterTable filters={props.filters} />;
}

function FilterTable(props) {
  const filtersArray = Object.entries(props.filters);
  return (
    <Table className="table table-hover">
      <tbody>
        {filtersArray.map(([query, filter], index) => (
          <FilterRow label={filter.label} query={query} key={index} />
        ))}
      </tbody>
    </Table>
  );
}

function FilterRow({ label, query }) {
  return (
    <tr>
      <td>
        <NavLink to={`/films?filter=${query}`} activeClassName="active">
          {label}
        </NavLink>
      </td>
    </tr>
  );
}

export default SideBar;
