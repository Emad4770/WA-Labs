import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavigationBar from "./components/Navigationbar";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./components/SideBar";
import Film from "./Film.mjs";
import FilmList from "./components/FilmComponents";

const filters = ["All", "Favorite", "Top Rated", "Seen Last Month", "Unseen"];
const film1 = new Film(1, "Godfather", true, "2024-01-20", 0, 1);
const film2 = new Film(2, "Matrix", false, null, 4, 1);
const film3 = new Film(3, "21 Grams", true, "2022-09-10", 1, 2);
const filmList = [film1, film2, film3];

const deleteFilm = (id) => {
  console.log("deleted " + id);
};

const editFilm = (id) => {
  console.log("edited " + id);
};

function App() {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col className="col-4 vh-100 bg-light">
            <SideBar filters={filters} />
          </Col>
          <Col className="col-8">
            <FilmList
              films={filmList}
              deleteFilm={deleteFilm}
              editFilm={editFilm}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
