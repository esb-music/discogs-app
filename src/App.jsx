import {Routes, Route} from "react-router-dom"
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Home, About, Timeline} from "./pages"
import {Album} from "./pages/Album.jsx"
import {loadDiscogs} from "./effects/index.js";
import {Alert} from "react-bootstrap";
import Musician from "./pages/Musician.jsx";
import {Musicians} from "./pages/Musicians.jsx";
import {dataService} from "./services/index.js";

export const App = () => {
  const [data, loading, error] = loadDiscogs();

  return (
    <>{console.log("App rendering")}
      {loading ? ("loading...") :
        (error ? (<Alert variant="danger">Could not load revision.json and discogs.json!</Alert>) :
          (<div className="App width:100%">
              {dataService.setDiscogs(data)}
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/:key" element={<Timeline/>}/>
                <Route path="/:key/:title" element={<Album/>}/>
                <Route path="/:key/musicians/:name" element={<Musician/>}/>
                <Route path="/:key/musicians" element={<Musicians/>}/>
                <Route path="/about" element={<About/>}/>
              </Routes>
            </div>
          ))}
    </>
  );
}
