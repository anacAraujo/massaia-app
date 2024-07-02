import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Moments from "./pages/Moments";
import Authors from "./pages/Authors";
import Artists from "./pages/Artists";
import Project from "./pages/Project";
import Site from "./pages/Site";
import NotFound from "./pages/NotFound";
import { CurrentStateProvider } from "./context/currentState";
import { CacheApiProvider } from "./context/cacheApi";

function App() {
  let userAgentString = navigator.userAgent;
  let safariAgent = userAgentString.indexOf("Safari") > -1;
  let chromeAgent = userAgentString.indexOf("Chrome") > -1;

  if (chromeAgent && safariAgent) safariAgent = false;

  let screenWidth = window.innerWidth;

  console.log("safariAgent: ", safariAgent);

  return (
    <CacheApiProvider>
      <CurrentStateProvider>
        <BrowserRouter>
          {safariAgent && screenWidth >= 769 && (
            <Navigate to="/notfound" replace />
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="temas/:songId" element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="galeria/:songId" element={<Gallery />} />
            <Route path="projeto" element={<Project />} />
            <Route path="autores" element={<Authors />} />
            <Route path="artistas" element={<Artists />} />
            <Route path="site" element={<Site />} />
            <Route path="momentos" element={<Moments />} />
            <Route
              path="notfound"
              element={<NotFound safariAgent={safariAgent} />}
            />
            <Route path="*" element={<NotFound safariAgent={safariAgent} />} />
          </Routes>
        </BrowserRouter>
      </CurrentStateProvider>
    </CacheApiProvider>
  );
}

export default App;
