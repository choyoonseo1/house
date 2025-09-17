import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">ShoeShop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/main">Main</Nav.Link>
          <Nav.Link as={Link} to="/login">로그인</Nav.Link>
          <Nav.Link as={Link} to="/signup">회원가입</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
