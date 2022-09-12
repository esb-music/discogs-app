import React from 'react';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import {Chrono} from 'react-chrono';
import Container from 'react-bootstrap/Container';

import {Footer, ErrorPage} from '../components';
import {loadDesc} from '../effects';
import {dataService} from '../services';
import {HeaderBand} from "../components/HeaderBand.jsx";

export const Musicians = () => {
  console.log("Musicians here");
  const {key} = useParams();
  console.log(key);
  const [data, loading, error] = loadDesc(key);
  const name = dataService.getNameByKey(key);
  console.log(loading);
  console.log(error);
  const navigate = useNavigate();

  const switchToMusician = ((timelineItem) => {
    console.log(timelineItem);
    navigate("/" + key + "/musicians/" + timelineItem.cardTitle);
  })

  // noinspection JSVoidFunctionReturnValueUsed
  return (
    <>
      {loading ? "loading..." :
        (error ?
          <>{ErrorPage(`Could not read the discogs description files for »${key}«!`,
            `There is no such band or musician or the description files for »${key}« are missing`)}</> :
          <Container>
            <>{dataService.setDesc(data)}</>
            {HeaderBand("musicians", key, name, navigate)}
            <br/> <br/>
            <h1>Musicians</h1>
            <div className="row overflow-auto mx-auto hide-scrollbar mt-2">
              <Chrono
                items={dataService.getMusicians().map((musician) =>
                  ({
                    title: musician.name,
                    cardTitle: musician.name,
                    cardSubtitle: musician.info,
                    media: {type: "IMAGE", source: {url: musician.img}}
                  }))}
                mode="VERTICAL_ALTERNATING"
                scrollable
                hideControls
                onItemSelected={switchToMusician}
                activeItemIndex='-1' // no item selected!!
              />
            </div>
            <br/>
            <br/>
            {Footer()}
          </Container>)}
    </>
  );
};
