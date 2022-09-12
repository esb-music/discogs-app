/**
 * @author Burkhardt Renz
 */

import React from "react";
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {Alert} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const ErrorPage = (alertMsg, reasonMsg) => (
  <Container>
    <h1>discogs-app</h1>
    <Alert variant="danger">{alertMsg}</Alert>
    <br/>
    <p>Why?</p>
    <p>{reasonMsg}</p>
    <br/>
    <Link to={"/"}>
      <Button variant="outline-primary">Home »</Button>
    </Link>
  </Container>
)
