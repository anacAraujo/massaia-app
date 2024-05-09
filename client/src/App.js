import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route>
          <Route path="/" index element={<Home></Home>}></Route>
          <Route path="/menu" element={<Menu></Menu>}></Route>
          {/* <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/breedinfo/:type/:breed" element={<BreedInfo></BreedInfo>}></Route>
        <Route path="/about" element={<About></About>}></Route> */}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
