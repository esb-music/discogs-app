import React from 'react';
import {useParams} from 'react-router';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import {Footer, ErrorPage} from '../components';
import {loadDesc} from '../effects';
import {dataService} from '../services';
import {HeaderBand} from "../components/HeaderBand.jsx";

export const Musicians = () => {
  const {key} = useParams();
  const [data, loading, error] = loadDesc(key);
  const name = dataService.getNameByKey(key);
  const navigate = useNavigate();
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
            <div className="list-group mt-2">
              {dataService.getMusicians()
                .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                .map(musician => (
                <a href={`../${key}/musicians/${musician.name}`}
                  className="list-group-item list-group-item-action" aria-current="true">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1 text-primary">{musician.name}</h5>
                  </div>
                  <p className="mb-1 text-start">{musician.info}</p>
                </a>
                ))}
            </div>
            <br/>
            <br/>
            {Footer()}
          </Container>)}
    </>
  );
};
