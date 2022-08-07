import { Routes, Route } from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import Album from "./pages/Album"
import Search from "./pages/Search"
import HowTo from "./pages/Howto"

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="album" element={ <Album/> } />
        <Route path="search" element={ <Search/> } />
        <Route path="howto" element={ <HowTo/> } />
      </Routes>
    </div>
  )
}

export default App
