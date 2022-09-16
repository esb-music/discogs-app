/**
 * @author Burkhardt Renz
 */

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCircleInfo, faHouse} from "@fortawesome/free-solid-svg-icons";

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
        return <Nav.Link href="/about"><FontAwesomeIcon icon={faCircleInfo}/></Nav.Link>
      default:
        return (<>
          <Nav.Link key="1" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft}/></Nav.Link>
          <Nav.Link key="2" href="/"><FontAwesomeIcon icon={faHouse}/></Nav.Link>
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
        </Navbar.Brand>
        <Nav className="fs-5">{brandText}</Nav>
        <Nav className="ms-auto">
          {naviPart(page)}
        </Nav>
      </Container>
    </Navbar>
  );
}
