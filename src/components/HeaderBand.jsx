/**
 * @author Burkhardt Renz
 */

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export const HeaderBand = (page, key, brandText, navigate) => {

  function naviPart(page, key) {

    let target;

    switch (page) {
      case "musician":
        target = `/${key}/musicians`;
        return (<>
          <Nav.Link key="4" href={target}>Musicians</Nav.Link>
          <Nav.Link key="3" onClick={() => navigate(-1)}>Back</Nav.Link>
          <Nav.Link key="2" href="/">Home< /Nav.Link>
          <Nav.Link key="1" href="/about">About< /Nav.Link>
        </>)
      case "timeline":
        target = `/${key}/musicians`;
        return (<>
          <Nav.Link key="4" href={target}>Musicians</Nav.Link>
          <Nav.Link key="3" onClick={() => navigate(-1)}>Back</Nav.Link>
          <Nav.Link key="2" href="/">Home< /Nav.Link>
          <Nav.Link key="1" href="/about">About< /Nav.Link>
        </>)
      case "album":
      case "musicians":
        target = `/${key}`;
        return (<>
          <Nav.Link key="4" href={target}>Timeline</Nav.Link>
          <Nav.Link key="3" onClick={() => navigate(-1)}>Back</Nav.Link>
          <Nav.Link key="2" href="/">Home< /Nav.Link>
          <Nav.Link key="1" href="/about">About< /Nav.Link>
        </>)
      default:
        return <Nav.Link href="/">Home< /Nav.Link>
    }
  }

  return (
    <Navbar bg="primary" variant="dark" sticky="top" expand="md">
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
        <Navbar.Toggle/>
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {naviPart(page, key)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
