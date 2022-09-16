/**
 * @author Burkhardt Renz
 */

import React from 'react';
import {useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";

import {Header, Footer} from '../components';
import {constants, dateFormat, localStore} from '../utils';

export const About = () => {

  let revision = localStore.getItem("revision");
  const navigate = useNavigate();

  return (<Container className="text-start">
    {Header("about", navigate)}
    <br/>
    <h2>About</h2>
    <p>This is discogs-app Rev. {constants.appRev} using the description files
      revision {revision.rev} from {dateFormat(revision.date)}.<br/>
      The app was developed by Pavlo Rozbytskyi and Burkhardt Renz, the current maintainer.</p>
    <h4>Purpose and Concept</h4>
    <p>The app lets you explore discographies of musicians or bands, with a focus on the original studio
      and live albums.<br/>
      The basic idea: The app uses the descriptions of musicians, albums and tracks provided in the data folder
      of the website to display the information.</p>
    <p>To extend the app with further musicians, it's just necessary to upload the descriptions to the data
      folder. The actual code of the app remains untouched.</p>
    <h4>A bit of history</h4>
    <p>Pavlo made a first variant of the app. His approach was a graphical representation of the relationships
      between musicians, albums, tracks and instruments. He developed this variant 2020 as a part of his software
      project at the Technische Hochschule THM in Gießen, Germany. The project is hosted at <a
        href="https://github.com/prozb/miles-davis-project" target={"_blank"}>Github</a>.</p>
    <p>In 2022 Burkhardt revisited the app and changed the user interface to a text-based appearance. The reason
      was that the app should work well on mobile devices too.</p>
    <h4>How To</h4>
    <p>The discographies are provided to the app by 4 JSON files: <code>discogs.json</code> contains a record
      for each of the discographies; then there are 3 JSON files describing albums, musicians and tracks.<br/>
      It is easiest to create these files using the companion project <a
        href="https://github.com/esb-music/discogs-db"
        target="_blank"><i>discogs-db</i></a>. The data are stored in a SQLite database and the JSON files
      are generated from it.</p>
    <h4>Data sources</h4>
    <p>There are comprehensive online repositiories and data bases like
      <a href="https://musicbrainz.org"
         target="_blank">MusicBrainz</a> or <a
        href="https://www.discogs.com" i target="_blank">Discogs</a>. But
      our preferred sources are
      <a href="https://en.wikipedia.org/wiki/Main_page" target="_blank">Wikipedia</a> and
      our own CD collection.</p>
    <br/>
    <Footer/>
  </Container>);
}
