/**
 * @author Burkhardt Renz
 */

import Container from "react-bootstrap/Container";
import {Navbar} from "react-bootstrap";

import {localStore, constants} from "../utils";

export const Footer = () => {

  let revision = localStore.getItem("revision");

  return (
    <Navbar bg="secondary" variant="dark">
      <Container fluid className="text-white fs-6">
        <Navbar.Text className="text-start">discogs-app Rev. {constants.appRev}<br/>
          Data Rev. {revision.rev} {revision.date}
        </Navbar.Text>
        <Navbar.Text className="text-end"><a
            className="link-light" href="https://github.com/esb-music/discogs-app" target="_blank">GitHub</a><br/>
          <a className="link-light" href="mailto:burkhardt.renz@mni.thm.de">Contact</a>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}
