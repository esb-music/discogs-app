/**
 * @author Burkhardt Renz
 */

import React from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionBody from "react-bootstrap/AccordionBody";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Musician = (musician, idx)  => (
  <Row key={idx}>
    <Col xs={1} className="text-center">
      &nbsp;
    </Col>
    <Col md="auto">
      {musician.name +  ": "} <span className="fst-italic">{musician.instruments}</span>
    </Col>
  </Row>
)

const Track = (trackDesc) => (

  <Accordion.Item eventKey={trackDesc.tno.toString()} key={trackDesc.tno}>
    <Accordion.Header>
      <Col xs={1} className="text-center">
        {trackDesc.tno}&nbsp;
      </Col>
      <Col md="auto">
        {trackDesc.title}
      </Col>
      <Col cs={1} className="text-end">
        {trackDesc.length}&emsp;
      </Col>
    </Accordion.Header>
    <AccordionBody>
      <Col>
        {trackDesc.performing.map((musician,idx) => Musician(musician, idx))}
      </Col>
    </AccordionBody>
  </Accordion.Item>
)

export const TrackList = (trackList) => (
  <Container fluid>
    <h4>Tracks</h4><br/>
    <Accordion alwaysOpen className="text-start">
      {trackList.map((trackDesc) => Track(trackDesc))}
    </Accordion>
  </Container>
)