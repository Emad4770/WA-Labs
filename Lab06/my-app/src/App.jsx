import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavigationBar from "./components/Navigationbar";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./components/SideBar";
import Film from "./Film.mjs";
import FilmList from "./components/FilmComponents";
import { useState } from "react";
import AddButton from "./components/AddButton";

const filtersList = [
  "All",
  "Favorite",
  "Top Rated",
  "Seen Last Month",
  "Unseen",
];

const filters = {
  All: { label: "All", filterFunction: (film) => film },
  Favorite: { label: "Favorites", filterFunction: (film) => film.favorite },
  "Top Rated": {
    label: "Top Rated",
    filterFunction: (film) => film.score === 5,
  },
  "Seen Last Month": {
    label: "Seen Last Month",
    filterFunction: (film) => film.watchDate > "2023-01-01",
  },
  Unseen: { label: "Unseen", filterFunction: (film) => !film.watchDate },
};
const film1 = new Film(1, "Godfather", true, "2024-01-20", 0, 1);
const film2 = new Film(2, "Matrix", false, null, 4, 1);
const film3 = new Film(3, "21Grams", true, "2022-09-10", 1, 2);
const film4 = new Film(4, "Spiderman", true, "2024-08-10", 5, 2);
const filmList = [film1, film2, film3, film4];

const editFilm = (id) => {
  console.log("edited " + id);
};

function App() {
  const [films, setFilms] = useState(filmList);
  const [selectedFilter, setSelectedFilter] = useState(filters["All"]);

  const deleteFilm = (id) => {
    setFilms(films.filter((film) => film.id != id));
    console.log("deleted " + id);
  };

  const addFilm = (title, favorite, watchDate, score, userId) => {
    setFilms((films) =>
      films.concat(
        new Film(
          films[films.length - 1].id + 1,
          title,
          favorite,
          watchDate,
          score,
          userId
        )
      )
    );
  };

  const selectFilter = (filter) => {
    setSelectedFilter(filters[filter]);
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col className="col-4 vh-100 bg-light">
            <SideBar
              filters={filtersList}
              selectedFilter={selectedFilter}
              selectFilter={selectFilter}
            />
          </Col>
          <Col className="col-8">
            <FilmList
              films={films}
              deleteFilm={deleteFilm}
              editFilm={editFilm}
              selectedFilterLabel={selectedFilter.label}
              selectedFilterFunction={selectedFilter.filterFunction}
            />
            <AddButton addFilm={addFilm} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
