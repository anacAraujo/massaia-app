import "./scss/style.scss";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AppRoutes></AppRoutes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
