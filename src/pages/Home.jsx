/**
 * @author Burkhardt Renz
 */

import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {Header, Footer} from '../components';
import {dataService} from '../services';

const CardGrid = () => {
  const discogs = dataService.getDiscogs();
  return (
    <Row xs={1} sm={2} className="g-4">
      <>{discogs.map(discog => (
        <Col key={discog.key}>
          <Card style={{heigth: "100%"}}>
            <Card.Img variant="top" src={discog.img} alt={discog.alt} />
            <Card.Body>
              <Card.Title><a href={discog.wiki} target='_blank'
                             className="link-dark">{discog.name}</a></Card.Title>
              {discog.active === 1 && <Link to={"/" + discog.key}>
                <Button variant="outline-primary">Explore »</Button>
              </Link>}
              {discog.active === 0 && <Link to="/">
                <Button variant="outline-primary">Coming soon</Button>
              </Link>}
            </Card.Body>
          </Card>
        </Col>))}</>
    </Row>
  );
}

const Title = () => {
  return (
    <Container fluid className="p-5">
      <h1 className="display-4">Discographies</h1>
      <p className="lead">Explore the discographies of some of the most
        famous musicians</p>
    </Container>
  );
}

export const Home = () => {

  const navigate = useNavigate();

  return (
    <Container>
      {Header("home", navigate)}
      <br/>
      <Title/>
      <CardGrid/>
      <br/>
      <Footer/>
    </Container>
  );
}
