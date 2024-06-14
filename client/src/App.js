import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Credits from "./pages/Credits";
import Moments from "./pages/Moments";
import Authors from "./pages/Authors";
import { CurrentStateProvider } from "./context/currentState";
import { CacheApiProvider } from "./context/cacheApi";

function App() {
  return (
    <CurrentStateProvider>
      <CacheApiProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              {/* TODO add header as global component */}
              {/* TODO create a specific link for each song to relate each one to a qr code */}
              <Route index element={<Home></Home>}></Route>
              <Route path="temas/:songId" element={<Home></Home>}></Route>
              <Route path="menu" element={<Menu></Menu>}></Route>
              <Route
                path="galeria/:songId"
                element={<Gallery></Gallery>}
              ></Route>
              <Route path="creditos" element={<Credits></Credits>}></Route>
              <Route path="momentos" element={<Moments></Moments>}></Route>
              <Route path="autores" element={<Authors></Authors>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </CacheApiProvider>
    </CurrentStateProvider>
  );
}

export default App;
