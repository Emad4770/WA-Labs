import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./components/SideBar";
import Film from "./Film.mjs";
import FilmComponents from "./components/FilmComponents";
import { useEffect, useState } from "react";
import FilmForm from "./components/FilmForm";
import { Route, Routes } from "react-router-dom";
import API from "./api/API";

const api = new API();

const filters = {
  "filter-all": { label: "All" },
  "filter-favorite": { label: "Favorites" },
  "filter-best": { label: "Top rated" },
  "filter-lastmonth": { label: "Seen in last month" },
  "filter-unseen": { label: "Unseen films" },
};

function App() {
  const [films, setFilms] = useState([]);
  const [query, setQuery] = useState("");

  // load films from the server and update the app state
  async function loadFilms(query) {
    const loadedFilms = await api.loadFilms(query);
    const filmList = loadedFilms.map(
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
    setFilms(filmList);
  }

  useEffect(() => {
    loadFilms(query);
  }, [query]);

  const deleteFilm = (id) => {
    setFilms((films) => films.filter((film) => film.id != id));
    console.log("deleted " + id);
  };
  const updateFilms = (film) => {
    setFilms((oldFilms) => {
      return oldFilms.map((f) => {
        if (f.id === film.id) {
          return new Film(
            film.id,
            film.title,
            film.favorite,
            film.watchDate,
            film.score,
            film.userId
          );
        } else return f;
      });
    });
  };

  const addFilm = (film) => {
    setFilms((oldFilms) => {
      const newId =
        oldFilms.length > 0
          ? Math.max(...oldFilms.map((film) => film.id)) + 1
          : 1;
      console.log("newId: " + newId);
      const newFilm = new Film(
        newId,
        film.title,
        film.favorite,
        film.watchDate,
        film.score,
        film.userId
      );
      return [...oldFilms, newFilm];
    });
  };

  return (
    <>
      <NavigationBar />

      <Routes>
        <Route
          path="/"
          element={
            <Container>
              <Row>
                <Col className="col-4 vh-100 bg-light">
                  <SideBar filters={filters} setQuery={setQuery} />
                </Col>
                <Col className="col-8">
                  <FilmComponents
                    films={films}
                    addFilm={addFilm}
                    deleteFilm={deleteFilm}
                    updateFilms={updateFilms}
                    filters={filters}
                    loadFilms={loadFilms}
                  />
                </Col>
              </Row>
            </Container>
          }
        />

        <Route
          path="/films/add"
          element={
            <FilmForm addFilm={addFilm} mode={"add"} loadFilms={loadFilms} />
          }
        />
        <Route
          path="/films/:filmId/edit"
          element={
            <FilmForm films={films} updateFilms={updateFilms} mode={"edit"} />
          }
        />

        <Route path="/*" element={<h1>Not Found</h1>} />
      </Routes>
      {/* <Container>
        <Row>
          <Col className="col-4 vh-100 bg-light">
            <SideBar
              filters={filtersList}
              selectedFilter={selectedFilter}
              selectFilter={selectFilter}
            />
          </Col>
          <Col className="col-8">
            <FilmComponents
              films={films}
              addFilm={addFilm}
              deleteFilm={deleteFilm}
              updateFilms={updateFilms}
              selectedFilterLabel={selectedFilter.label}
              selectedFilterFunction={selectedFilter.filterFunction}
            />
          </Col>
        </Row>
      </Container> */}
    </>
  );
}

export default App;
