import { useState, useEffect } from 'react';
import AppHeader from "../components/AppHeader"
import AppSidebar from "../components/AppSidebar"
import AlbumTable from "../components/AlbunsTable"
import axios from '../lib/AxiosConfig'

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        getAlbums();
    }, []);

    const getAlbums = async () => {
        try {
            const response = await axios.get(`/albums`);
            setAlbums(response.data);
        } catch (error) {
            setError(error.response);
            console.error(error);
        }
    }
    //console.log(albums);

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className='body flex-grow-1'>
                    <div className='container-lg px-4'>
                        <div className='row'>
                            <div className="col-12">
                                <AlbumTable
                                    albums={albums}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Albums;