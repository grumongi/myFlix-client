import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
//import PropTypes from "prop-types";

export const NavigationBar = ({ user, onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Navbar.Brand as={Link} to="/movies">
        MyFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {user && (
            <>
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
              <Nav.Link as={Link} to={`/profile`}>
                Profile
              </Nav.Link>
            </>
          )}
        </Nav>
        {user ? (
          <Button variant="outline-light" onClick={onLogout}>
            Logout
          </Button>
        ) : (
          <Nav>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

//NavigationBar.propTypes = {
   // user: PropTypes.string,
  //  onLogout: PropTypes.func.isRequired
  //};