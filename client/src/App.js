import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Credits } from "./pages/Credits";
import { ViewLandingContext } from "./context/viewLandingContext";

function App() {
  const [hasViewedLandingPage, setHasViewedLandingPage] = useState(false);

  function handleHasViewedLandingPage(hasViewedLandingPage) {
    setHasViewedLandingPage(hasViewedLandingPage);
    localStorage.setItem(
      "hasViewedLandingPage",
      JSON.stringify(hasViewedLandingPage)
    );
  }

  useEffect(() => {
    const localHasViewedLandingPage = localStorage.getItem(
      "hasViewedLandingPage"
    );
    if (localHasViewedLandingPage) {
      setHasViewedLandingPage(JSON.parse(localHasViewedLandingPage));
    }
    console.log("localHasViewedLandingPage: ", localHasViewedLandingPage);
    setHasViewedLandingPage(false);
  }, []);
  return (
    <ViewLandingContext.Provider
      value={{
        hasViewedLandingPage: hasViewedLandingPage,
        setHasViewedLandingPage: handleHasViewedLandingPage,
      }}
    >
      <HashRouter>
        <Routes>
          <Route>
            <Route path="/" index element={<Home></Home>}></Route>
            <Route path="/menu" element={<Menu></Menu>}></Route>
            <Route path="/credits" element={<Credits></Credits>}></Route>
            {/* <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/breedinfo/:type/:breed" element={<BreedInfo></BreedInfo>}></Route>
        <Route path="/about" element={<About></About>}></Route> */}
          </Route>
        </Routes>
      </HashRouter>
    </ViewLandingContext.Provider>
  );
}

export default App;
