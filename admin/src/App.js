import './scss/style.scss'
import AppRoutes from './routes';
import { AuthContextProvider } from './context/AuthContext';


function App() {
  return (
    <AuthContextProvider>
      <AppRoutes>
      </AppRoutes>
    </AuthContextProvider>
  );
}

export default App;
