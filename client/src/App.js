import { HashRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Credits } from "./pages/Credits";
import { Moments } from "./pages/Moments";
import { ViewLandingContextProvider } from "./context/viewLandingContext";
import { ViewAlbumsMenuProvider } from "./context/viewAlbumsMenu";

function App() {
  return (
    <ViewLandingContextProvider>
      <ViewAlbumsMenuProvider>
        <HashRouter>
          <Routes>
            <Route>
              <Route path="/" index element={<Home></Home>}></Route>
              <Route path="/menu" element={<Menu></Menu>}></Route>
              <Route path="/credits" element={<Credits></Credits>}></Route>
              <Route path="/momentos" element={<Moments></Moments>}></Route>
            </Route>
          </Routes>
        </HashRouter>
      </ViewAlbumsMenuProvider>
    </ViewLandingContextProvider>
  );
}

export default App;
