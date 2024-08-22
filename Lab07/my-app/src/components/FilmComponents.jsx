/* eslint-disable react/prop-types */
import { Table, Row, Col, Button } from "react-bootstrap";
import FilmForm from "./FilmForm";
import { useState } from "react";
// import dayjs from "dayjs";

function Films(props) {
  const [mode, setMode] = useState("view");
  const [editableFilm, setEditableFilm] = useState();

  const handleEdit = (film) => {
    setEditableFilm(film);
    setMode("edit");
  };

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
            filterFunction={props.selectedFilterFunction}
            handleEdit={handleEdit}
          />
        </Col>
      </Row>
      {mode === "add" && (
        <FilmForm
          mode={mode}
          cancel={() => setMode("view")}
          addFilm={(film) => {
            props.addFilm(film);
            setMode("view");
          }}
        />
      )}
      {mode === "edit" && (
        <FilmForm
          mode={mode}
          cancel={() => setMode("view")}
          editableFilm={editableFilm}
          editFilm={(film) => {
            props.editFilm(film);
            setMode("view");
          }}
        />
      )}
      {mode == "view" && (
        <Button
          type="primary"
          className="rounded-circle fixed-right-bottom"
          onClick={() => setMode("add")}
        >
          +
        </Button>
      )}
    </>
  );
}

function FilmTable(props) {
  return (
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
                handleEdit={props.handleEdit}
              />
            )
        )}
      </tbody>
    </Table>
  );
}

function FilmRow(props) {
  return (
    <tr>
      <FilmData film={props.film} />
      <FilmActions
        film={props.film}
        deleteFilm={props.deleteFilm}
        editFilm={props.editFilm}
        handleEdit={props.handleEdit}
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
          onClick={() => props.handleEdit(props.film)}
        ></i>
      </td>
      <td>
        <i
          className="bi bi-trash "
          onClick={() => props.deleteFilm(props.film.id)}
        ></i>
      </td>
    </>
  );
}

export default Films;
