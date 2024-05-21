import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import Users from './pages/Users'
import Albums from './pages/Albums'
import Songs from './pages/Songs'
import ArtPieces from './pages/ArtPieces'
import Moments from './pages/Moments'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/users" element={<Users />}/>
                <Route path="/albums" element={<Albums />}/>
                <Route path="/songs" element={<Songs />}/>
                <Route path="/art_pieces" element={<ArtPieces />}/>
                <Route path="/moments" element={<Moments />}/>
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;