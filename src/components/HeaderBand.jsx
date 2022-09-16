/**
 * @author Burkhardt Renz
 */

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {faArrowLeft, faCircleInfo, faHouse} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const HeaderBand = (page, key, brandText, navigate) => {

  function naviPart(page, key) {

    let target;

    switch (page) {
      case "musician":
      case "timeline":
        target = `/${key}/musicians`;
        return (<>
          <Nav.Link key="4" href={target}>Musicians</Nav.Link>
          <Nav.Link key="3" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft}/></Nav.Link>
          <Nav.Link key="2" href="/"><FontAwesomeIcon icon={faHouse}/></Nav.Link>
          <Nav.Link key="1" href="/about"><FontAwesomeIcon icon={faCircleInfo}/>< /Nav.Link>
        </>)
      case "album":
      case "musicians":
        target = `/${key}`;
        return (<>
          <Nav.Link key="4" href={target}>Timeline</Nav.Link>
          <Nav.Link key="3" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft}/></Nav.Link>
          <Nav.Link key="2" href="/"><FontAwesomeIcon icon={faHouse}/></Nav.Link>
          <Nav.Link key="1" href="/about"><FontAwesomeIcon icon={faCircleInfo}/>< /Nav.Link>
        </>)
      default:
        return <Nav.Link href="/"><FontAwesomeIcon icon={faHouse}/></Nav.Link>
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
          {naviPart(page, key)}
        </Nav>
      </Container>
    </Navbar>
  );
}
