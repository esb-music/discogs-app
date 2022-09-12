/**
 * @author Burkhardt Renz
 */

import React from 'react';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import {Chrono} from 'react-chrono';
import Container from 'react-bootstrap/Container';

import {Footer, ErrorPage} from '../components';
import {loadDesc} from '../effects';
import {dateFormat} from '../utils';
import {dataService} from '../services';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {HeaderBand} from "../components/HeaderBand.jsx";

export const Timeline = () => {
  const {key} = useParams();
  const [desc, loading, error] = loadDesc(key);
  const name = dataService.getNameByKey(key);
  const navigate = useNavigate();

  const switchToAlbum = ((timelineItem) => {
    console.log(timelineItem);
    navigate("/" + key + "/" + timelineItem.cardTitle);
  })

  // noinspection JSVoidFunctionReturnValueUsed
  return (
    <>
      {loading ? "loading..." :
        (error ?
          <>{ErrorPage(`Could not read the discogs description files for »${key}«!`,
            `There is no such band or musician or the description files for »${key}« are missing`)}</> :
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={12}>
                <>{dataService.setDesc(desc)}</>
                {HeaderBand("timeline", key, name, navigate)}
                <br/> <br/>
                <h1>Timeline</h1>
                <div className="row overflow-auto mx-auto hide-scrollbar mt-2">
                  <Chrono
                    items={dataService.getAlbums().map((album) =>
                      ({
                        title: dateFormat(album.released),
                        cardTitle: album.title,
                        cardSubtitle: album.subtitle,
                        media: {type: "IMAGE", source: {url: album.img}}
                      }))}
                    mode="VERTICAL_ALTERNATING"
                    scrollable
                    hideControls
                    onItemSelected={switchToAlbum}
                    activeItemIndex='-1' // no item selected!!
                  />
                </div>
                <br/>
                <br/>
                <Footer/>
              </Col>
            </Row>
          </Container>)}
    </>
  );
};
