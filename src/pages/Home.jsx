import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const discogs = [
  {
    "info": "Miles Davis",
    "name": "Miles Davis discography",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Miles_Davis_by_Palumbo.jpg/220px-Miles_Davis_by_Palumbo.jpg",
    "alt": "Miles Davis - 1986.jpg",
    "data": "miles-dataset",
    "url": "https://en.wikipedia.org/wiki/Miles_Davis"
  },
  {
    "info": "Cream",
    "name": "Cream discography",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Cream_on_Fanclub_1968.png/250px-Cream_on_Fanclub_1968.png",
    "alt": "Cream logo",
    "data": "cream-dataset",
    "url": "https://en.wikipedia.org/wiki/Cream_(band)"
  }
];

function getCardGroup() {
  return (
    <CardGroup>
      {discogs.map(discog => (
        <Card>
          <Card.Title>{discog.name}</Card.Title>
        </Card>))}
    </CardGroup>
  )
}

function Home() {
  return (
    <div>
      <h1>This is the home page</h1>
      <Link to="album">Click to view our album page</Link>
      <Link to="search">Click to view our search page</Link>
      <Link to="howto">Click to view our howto page</Link>
      {getCardGroup()}
    </div>
  );
}

export default Home;