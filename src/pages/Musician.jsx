import React, {useState} from 'react';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import {Footer, ErrorPage, MusicianCard, AlbumList} from '../components';
import {loadDesc} from '../effects';
import {dataService} from '../services';
import {HeaderBand} from "../components/HeaderBand.jsx";

const Musician = () => {
  const {key, name} = useParams();
  const [data, loading, error] = loadDesc(key);
  const discogName = dataService.getNameByKey(key);
  const navigate = useNavigate();

  const partnerDefault = "Choose musician:"
  const [kindOfTracks, setkindOfTracks] = useState("all");
  const [partner, setPartner] = useState(partnerDefault);

  const handleRadio = e => {
    setkindOfTracks(e.target.value);
  };

  const handlePartner = e => {
    setPartner(e.target.value);
  };

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
              <Form>
                <div key="inline-radio" className="mb-2">
                  <Form.Check inline className="text-start" name="partner?" type="radio" value="all" label="All tracks"
                              onChange={handleRadio} checked={kindOfTracks === "all"}/>
                  <Form.Check inline className="text-start" name="partner?" type="radio" value="partner"
                              label="Tracks performed together with"
                              onChange={handleRadio} checked={kindOfTracks === "partner"}/>
                </div>
                {(kindOfTracks === "all") ? "" :
                  <div className="d-flex justify-content-center">
                    <div className="row col-sm-10 col-md-6">
                    <Form.Select type="text" onChange={handlePartner} readOnly>
                      <option key="-1">{partnerDefault}</option>
                      {dataService.getPartnersOfMusician(name).map((musician, index) =>
                          <option key={index}>{musician}</option>)}
                    </Form.Select></div></div>
                }
              </Form>
              <br/>
              {(kindOfTracks === "all" || partner === "Choose musician:") ?
              AlbumList(dataService.getAlbumsOfMusician(name), key) :
              AlbumList(dataService.getAlbumsOfPartners(name, partner), key)
              }
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