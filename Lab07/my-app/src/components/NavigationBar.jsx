import { Navbar, Container } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Film Library</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
