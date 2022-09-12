/**
 * @author Burkhardt Renz
 */

import React from "react";
import {dateFormat} from "../utils/index.js";

export const MusicianCard = (musicianDesc) => (
  <div className="card border-0 mb-3">
    <div className="row g-0">
      <div className="col-md-4 mt-auto">
        <img src={musicianDesc.img}
             alt={musicianDesc.alt}
             className="img-fluid float-start rounded-start"/>
      </div>
      <div className="col-md-8 text-start">
        <div className="card-body">
          <h4 className="card-title">{musicianDesc.name}</h4>
          {musicianDesc.info && <h6 className="card-title text-muted">{musicianDesc.info}</h6>}
          <p className="card-text fs-6 lh-sm">
            {musicianDesc.bdate && <span>* {dateFormat(musicianDesc.bdate)}<br/></span>}
            {musicianDesc.ddate && <span>† {dateFormat(musicianDesc.ddate)}<br/></span>}
          </p>
          <p className="card-text lh-sm">
            <a href={musicianDesc.wiki} target="_blank">Wikipedia</a>
          </p>
        </div>
      </div>
    </div>
  </div>
)

