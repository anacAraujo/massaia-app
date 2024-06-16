import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import Users from './pages/Users'
import Albums from './pages/Albums'
import Songs from './pages/Songs'
import ArtPieces from './pages/ArtPieces'
import Moments from './pages/Moments'
import Artists from './pages/Artists'
import Roles from './pages/Roles'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/utilizadores" element={<Users />}/>
                <Route path="/albuns" element={<Albums />}/>
                <Route path="/musicas" element={<Songs />}/>
                <Route path="/obras" element={<ArtPieces />}/>
                <Route path="/momentos" element={<Moments />}/>
                <Route path="/artistas" element={<Artists />}/>
                <Route path="/cargos" element={<Roles />}/>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;