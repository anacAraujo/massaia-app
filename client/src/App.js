import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Gallery  from "./pages/Gallery";
import Credits from "./pages/Credits";
import Moments from "./pages/Moments";
import { ViewAlbumsMenuProvider } from "./context/viewAlbumsMenu";
import cacheApiProvider from "./context/cacheApi";

function App() {
  return (
    <ViewAlbumsMenuProvider>
      <HashRouter>
        <Routes>
          <Route>
            <Route path="/" index element={<Home></Home>}></Route>
            <Route path="/menu" element={<Menu></Menu>}></Route>
            <Route path="/gallery/:volume" element={<Gallery></Gallery>}></Route>
            <Route path="/credits" element={<Credits></Credits>}></Route>
            <Route path="/momentos" element={<Moments></Moments>}></Route>
          </Route>
        </Routes>
      </HashRouter>
    </ViewAlbumsMenuProvider>
  );
}

export default App;
