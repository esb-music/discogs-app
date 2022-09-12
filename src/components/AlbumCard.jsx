/**
 * @author Burkhardt Renz
 */

import React from 'react';
import {Link} from 'react-router-dom';

import {dateFormat} from "../utils";

export const AlbumCard = (albumDesc) => (
  <div className="card border-0 mb-3">
    <div className="row g-0">
      <div className="col-md-4 mt-auto">
        <img src={albumDesc.img}
             alt={albumDesc.alt}
             className="img-fluid float-start rounded-start"/>
      </div>
      <div className="col-md-8 text-start">
        <div className="card-body">
          <h4 className="card-title">{albumDesc.title}</h4>
          {albumDesc.subtitle && <h6 className="card-title text-muted">{albumDesc.subtitle}</h6>}
          <p className="card-text fs-6"><a href={albumDesc.wiki} target="_blank">Wikipedia</a></p>
          <p className="card-text fs-6 lh-sm">
            {albumDesc.label && <span>Label: {albumDesc.label}<br/></span>}
            {albumDesc.producer && <span>Producer: {albumDesc.producer}<br/></span>}
            {albumDesc.released && <span>Released: {dateFormat(albumDesc.released)}<br/></span>}
            {albumDesc.recorded && <span>Recorded: {albumDesc.recorded}<br/></span>}
            {albumDesc.venue && <span>Venue: {albumDesc.venue}<br/></span>}
            {albumDesc.length && <span>Length: {albumDesc.length}</span>}
          </p>
          <p className="card-text lh-sm">
            {albumDesc.musicians.map((musician, idx, {length}) => {
              if (idx === length - 1) {
                return (
                  <span key={idx}>
                  <Link to={`../${albumDesc.key}/musicians/${musician.name}`}>{musician.name} </Link>
                  </span>
                )
              } else {
                return (
                  <span key={idx}>
                  <Link to={`../${albumDesc.key}/musicians/${musician.name}`}>{musician.name} </Link> <span> – </span>
                  </span>
                )
              }
            })}
          </p>
        </div>
      </div>
    </div>
  </div>
)

