import React from 'react';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import {Footer, ErrorPage, MusicianCard, AlbumList}  from '../components';
import {loadDesc} from '../effects';
import {dataService} from '../services';
import {HeaderBand} from "../components/HeaderBand.jsx";

const Musician = () => {
  const {key, name} = useParams();
  console.log("key: " + key);
  console.log("name: " + name);
  const [data, loading, error] = loadDesc(key);
  const discogName = dataService.getNameByKey(key);
  const navigate = useNavigate();

  /* The loading of the descriptions seems to be superfluous, and it is indeed when coming
     from Timeline. But: Using the route to album directly needs the loading of the
     descriptions.
   */

  /* The loading of the descriptions seems to be superfluous, and it is indeed when coming
     from Timeline. But: Using the route to album directly we need to load the descriptions.
   */
  return (
      <>
        {loading ? "loading..." :
          (error ? <>{ErrorPage(`Could not read the discogs description files for »${key}«!`,
              `There is no such band or musician or the description files for »${key}« are missing`)}</> :
            (dataService.setDesc(data) && dataService.getMusicianByName(name) ?
              <Container>
                {HeaderBand("musician", key, discogName, navigate)}
                <br/><br/>
                {MusicianCard(dataService.getMusicianByName(name))}
                <br/>
                {AlbumList(dataService.getAlbumsOfMusician(name), key)}
                <br/><br/><br/>
                {Footer()}
              </Container> :
              <>{ErrorPage(`Could not open the page for »${name}«`,
                "There is no such musician or the musician description could not be loaded.")}</>))
        }
      </>
    )
};

export default Musician;