import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';  // Adjust path as necessary
import { useLogout } from '../hooks/useLogout';  // Assuming you have this hook

const CustomNavbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
    dispatch({ type: 'LOGOUT' });  // Ensure context state is updated
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Book Reviewer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/user">{user.username}</Nav.Link>
                <Nav.Link onClick={handleClick}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
