import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Moments from "./pages/Moments";
import Authors from "./pages/Authors";
import Artists from "./pages/Artists";
import Project from "./pages/Project";
import Site from "./pages/Site";
import { CurrentStateProvider } from "./context/currentState";
import { CacheApiProvider } from "./context/cacheApi";

function App() {
  return (
    <CacheApiProvider>
      <CurrentStateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              {/* TODO add header as global component */}
              <Route index element={<Home></Home>}></Route>
              <Route path="temas/:songId" element={<Home></Home>}></Route>
              <Route path="menu" element={<Menu></Menu>}></Route>
              <Route
                path="galeria/:songId"
                element={<Gallery></Gallery>}
              ></Route>
              <Route path="projeto" element={<Project></Project>}></Route>
              <Route path="autores" element={<Authors></Authors>}></Route>
              <Route path="artistas" element={<Artists></Artists>}></Route>
              <Route path="site" element={<Site></Site>}></Route>
              <Route path="momentos" element={<Moments></Moments>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </CurrentStateProvider>
    </CacheApiProvider>
  );
}

export default App;
