/**
 * @author Burkhardt Renz
 */

import React from "react";
import {Link} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import AccordionBody from "react-bootstrap/AccordionBody";

const Album = (albumDesc, idx, key) => {

  let target = "/" + key + "/" + albumDesc.album;

  return (
    <Accordion.Item eventKey={idx} key={idx}>
      <Accordion.Header>
        <span key="1" style={{width: "85%"}}><Link to={target}>{albumDesc.album}</Link></span>
      </Accordion.Header>
      <AccordionBody>
        <ul>
          {albumDesc.tracks.map((track, idx) =>
            <li key={idx.toString()}>{track.title}</li>)}
        </ul>
      </AccordionBody>
    </Accordion.Item>);
}

export const AlbumList = (albumList, key) => (
  <Container fluid>
    <h4>Albums & Tracks</h4><br/>
    <Accordion className="text-start">
      {albumList.map((albumDesc, idx) => Album(albumDesc, idx, key))}
    </Accordion>
  </Container>
)
