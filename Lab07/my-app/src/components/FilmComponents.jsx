/* eslint-disable react/prop-types */
import { Table, Row, Col } from "react-bootstrap";
// import dayjs from "dayjs";

function Films(props) {
  return (
    <>
      <Row>
        <Col>
          <h1>Filter: {props.selectedFilterLabel}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <FilmTable
            films={props.films}
            deleteFilm={props.deleteFilm}
            editFilm={props.editFilm}
            filterFunction={props.selectedFilterFunction}
          />
        </Col>
      </Row>
    </>
  );
}

function FilmTable(props) {
  return (
    props.films.length > 0 && (
      <Table className="table-hover" striped id="film-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Favorite</th>
            <th>Watch Date</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {props.films.map(
            (film) =>
              props.filterFunction(film) && (
                <FilmRow
                  film={film}
                  key={film.id}
                  deleteFilm={props.deleteFilm}
                  editFilm={props.editFilm}
                />
              )
          )}
        </tbody>
      </Table>
    )
  );
}

function FilmRow(props) {
  return (
    <tr>
      <FilmData film={props.film} />
      <FilmActions
        filmId={props.film.id}
        deleteFilm={props.deleteFilm}
        editFilm={props.editFilm}
      />
    </tr>
  );
}

function FilmData(props) {
  return (
    <>
      <td>{props.film.title}</td>
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={props.film.favorite}
            id={props.film.id}
            checked={props.film.favorite}
            disabled
          ></input>
          <label className="form-check-label" htmlFor={props.film.id}>
            Favorite
          </label>
        </div>
      </td>
      <td>
        {props.film.watchDate && props.film.watchDate.format("MMMM DD, YYYY")}
      </td>
      <td>
        <Rating score={props.film.score} maxStar={5} />
      </td>
    </>
  );
}

function Rating({ score, maxStar }) {
  return [...Array(maxStar)].map((el, index) => (
    <i
      key={index}
      className={index < score ? "bi bi-star-fill" : "bi bi-star"}
    />
  ));
}

function FilmActions(props) {
  return (
    <>
      <td>
        <i
          className="bi bi-pencil-square"
          onClick={() => props.editFilm(props.filmId)}
        ></i>
      </td>
      <td>
        <i
          className="bi bi-trash "
          onClick={() => props.deleteFilm(props.filmId)}
        ></i>
      </td>
    </>
  );
}

export default Films;
