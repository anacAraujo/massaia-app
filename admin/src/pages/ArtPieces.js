import { useState, useEffect } from 'react';
import AppHeader from "../components/AppHeader"
import AppFooter from "../components/AppFooter"
import AppSidebar from "../components/AppSidebar"
import ArtPiecesTable from '../components/ArtPiecesTable'
import axios from '../lib/AxiosConfig'

const ArtPieces = () => {
    const [artPieces, setArtPieces] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getArtPieces();
    }, []);

    const getArtPieces = async () => {
        try {
            const response = await axios.get(`/art_pieces`);
            setArtPieces(response.data);
        } catch (error) {
            setError(error.response);
            console.error(error);
        }
    }
    console.log(artPieces);

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className='body flex-grow-1'>
                    <div className='container-lg px-4'>
                        <div className='row'>
                            <div className="col-12">
                                <ArtPiecesTable
                                    artPieces={artPieces}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>
    )
}

export default ArtPieces;