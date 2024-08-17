/* eslint-disable react/prop-types */
import { Table, Row, Col } from "react-bootstrap";
// import dayjs from "dayjs";

function Films(props) {
  return (
    <>
      <Row>
        <Col>
          <h1>Filter: All</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <FilmTable films={props.films} />
        </Col>
      </Row>
    </>
  );
}

function FilmTable(props) {
  return (
    <Table className="table-hover" striped>
      <thead>
        <tr>
          <th>Title</th>
          <th>Favorite</th>
          <th>Watch Date</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {props.films.map((film) => (
          <FilmRow film={film} key={film.id} />
        ))}
      </tbody>
    </Table>
  );
}

function FilmRow(props) {
  return (
    <tr>
      <FilmData film={props.film} />
      {/* <FilmActions /> */}
    </tr>
  );
}

function FilmData(props) {
  const emptyStar = <i className="bi bi-star"></i>;
  const fullStar = <i className="bi bi-star-fill"></i>;

  const stars = {
    0: {
      label: "Zero",
      star: (
        <div>
          {emptyStar} {emptyStar} {emptyStar} {emptyStar} {emptyStar}
        </div>
      ),
    },
    1: {
      label: "One",
      star: (
        <div>
          {fullStar} {emptyStar} {emptyStar} {emptyStar} {emptyStar}
        </div>
      ),
    },
    2: {
      label: "Two",
      star: (
        <div>
          {fullStar} {fullStar} {emptyStar} {emptyStar} {emptyStar}
        </div>
      ),
    },
    3: {
      label: "Three",
      star: (
        <div>
          {fullStar} {fullStar} {fullStar} {emptyStar} {emptyStar}
        </div>
      ),
    },
    4: {
      label: "Four",
      star: (
        <div>
          {fullStar} {fullStar} {fullStar} {fullStar} {emptyStar}
        </div>
      ),
    },
    5: {
      label: "Five",
      star: (
        <div>
          {fullStar} {fullStar} {fullStar} {fullStar} {fullStar}
        </div>
      ),
    },
  };

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
      <td>{stars[props.film.score].star}</td>
    </>
  );
}

// function FilmActions(props) {}

export default Films;
