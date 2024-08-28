import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import NavigationBar from "./components/Navigationbar";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./components/SideBar";
import Film from "./Film.mjs";
import FilmComponents from "./components/FilmComponents";
import { useState } from "react";
import FilmForm from "./components/FilmForm";
import { Route, Routes } from "react-router-dom";

const filters = {
  all: { label: "All", filterFunction: (film) => film },
  favorite: { label: "Favorites", filterFunction: (film) => film.favorite },
  best: {
    label: "Top Rated",
    filterFunction: (film) => film.score === 5,
  },
  "last-month": {
    label: "Seen Last Month",
    filterFunction: (film) => film.watchDate > "2023-01-01",
  },
  unseen: { label: "Unseen", filterFunction: (film) => !film.watchDate },
};
const film1 = new Film(1, "Godfather", true, "2024-01-20", 0, 1);
const film2 = new Film(2, "Matrix", false, null, 4, 1);
const film3 = new Film(3, "21Grams", true, "2022-09-10", 1, 2);
const film4 = new Film(4, "Spiderman", true, "2024-08-10", 5, 2);
const filmList = [film1, film2, film3, film4];

function App() {
  const [films, setFilms] = useState(filmList);

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
                  <SideBar filters={filters} />
                </Col>
                <Col className="col-8">
                  <FilmComponents
                    films={films}
                    addFilm={addFilm}
                    deleteFilm={deleteFilm}
                    updateFilms={updateFilms}
                    filters={filters}
                  />
                </Col>
              </Row>
            </Container>
          }
        />

        <Route
          path="/films/add"
          element={<FilmForm addFilm={addFilm} mode={"add"} />}
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
