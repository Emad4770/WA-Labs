/* eslint-disable react/prop-types */
import { Table, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
// import dayjs from "dayjs";

function Films({ filters, ...props }) {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();

  const selectedFilter = searchParam.get("filter") || "all";

  const handleEdit = (film) => {
    navigate(`/films/${film.id}/edit`);
  };

  return !filters[selectedFilter] ? (
    <h1>Wrong Filter Parameter</h1>
  ) : (
    <>
      <Row>
        <Col>
          <h1>Filter: {filters[selectedFilter]?.label}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <FilmTable
            films={props.films}
            deleteFilm={props.deleteFilm}
            selectedFilter={selectedFilter}
            filters={filters}
            handleEdit={handleEdit}
          />
        </Col>
      </Row>

      <Button
        type="primary"
        className="rounded-circle fixed-right-bottom"
        onClick={() => navigate("/films/add")}
      >
        +
      </Button>
    </>
  );
}

function FilmTable({ selectedFilter, filters, ...props }) {
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
        {/* {console.log(props.films)} */}
        {props.films.map(
          (film) =>
            filters[selectedFilter]?.filterFunction(film) && (
              <FilmRow
                film={film}
                key={film.id}
                deleteFilm={props.deleteFilm}
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
