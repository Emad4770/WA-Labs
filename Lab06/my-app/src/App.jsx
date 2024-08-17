import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/Navigationbar";
import { Col, Container, Row } from "react-bootstrap";
import SideBar from "./components/SideBar";

const filters = ["All", "Favorite", "Top Rated", "Seen Last Month"];

function App() {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col className="col-4 vh-100 bg-light">
            <SideBar filters={filters} />
          </Col>
          <Col className="col-8"></Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
