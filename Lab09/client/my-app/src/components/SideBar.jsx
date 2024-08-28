/* eslint-disable react/prop-types */

import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import API from "../api/API";
import Film from "../Film.mjs";

const api = new API();

function SideBar(props) {
  return <FilterTable filters={props.filters} setFilms={props.setFilms} />;
}

function FilterTable(props) {
  const filtersArray = Object.entries(props.filters);
  return (
    <Table className="table table-hover">
      <tbody>
        {filtersArray.map(([query, filter], index) => (
          <FilterRow
            label={filter.label}
            query={query}
            key={index}
            setFilms={props.setFilms}
          />
        ))}
      </tbody>
    </Table>
  );
}

async function loadFilms(filter) {
  const films = await api.loadFilms(filter);
  const filmList = films.map(
    (film) =>
      new Film(
        film.id,
        film.title,
        film.favorite,
        film.watchDate,
        film.score,
        film.userId
      )
  );

  return filmList;
}

function FilterRow({ label, query, setFilms }) {
  return (
    <tr>
      <td>
        <NavLink
          to={`/?filter=${query}`}
          onClick={() => loadFilms(query).then((films) => setFilms(films))}
        >
          {label}
        </NavLink>
      </td>
    </tr>
  );
}

export default SideBar;
