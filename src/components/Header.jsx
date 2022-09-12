/**
 * @author Burkhardt Renz
 */

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// used in Home and About
export const Header = (page, navigate) => {

  let brandText;
  switch (page) {
    case "home":
      brandText = "Home";
      break;
    default:
      brandText = "About"
  }

  let naviPart = (page) => {
    switch (page) {
      case "home":
        return <Nav.Link href="/about">About< /Nav.Link>
      default:
        return (<>
          <Nav.Link key="1" onClick={() => navigate(-1)}>Back< /Nav.Link>
          <Nav.Link key="2" href="/">Home< /Nav.Link>
        </>)
    }
  }

  return (
    <Navbar bg="primary" variant="dark" sticky="top">
      <Container className="text-white">
        <Navbar.Brand href="/">
          <img
            src="/discogs.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Discogs-app logo"
          />
          &nbsp;&nbsp;{brandText}
        </Navbar.Brand>
          <Nav className="ms-auto">
            {naviPart(page)}
          </Nav>
      </Container>
    </Navbar>
  );
}
