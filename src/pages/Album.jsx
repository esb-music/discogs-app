/**
 * @author Burkhardt Renz
 */

import React from 'react';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import {AlbumCard, Footer, TrackList, ErrorPage} from '../components';
import {loadDesc} from '../effects';
import {dataService} from '../services';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {HeaderBand} from "../components/HeaderBand.jsx";

export const Album = () => {
  const {key, title} = useParams();
  const [data, loading, error] = loadDesc(key);
  const name = dataService.getNameByKey(key);
  const navigate = useNavigate();

  /* The loading of the descriptions seems to be superfluous, and it is indeed when coming
     from Timeline. But: Using the route to album directly we need to load the descriptions.
   */

  return (
    <>
      {loading ? "loading..." :
        (error ? <>{ErrorPage(`Could not read the discogs description files for »${key}«!`,
            `There is no such band or musician or the description files for »${key}« are missing`)}</> :
          (dataService.setDesc(data) && dataService.getAlbumByTitle(title) ?
            <Container>
              {HeaderBand("album", key, name, navigate)}
              <br/><br/>
              {AlbumCard(dataService.getAlbumByTitle(title))}
              <br/>
              {TrackList(dataService.getTracksOfAlbum(title))}
              <br/><br/><br/>
              <Footer/>
            </Container> :
            <>{ErrorPage(`Could not open the album page for »${title}«`,
              "There is no such album or the album description could not be loaded.")}</>))
      }
    </>
  )
};
