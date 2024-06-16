import { useState, useEffect } from 'react';
import AppHeader from "../components/AppHeader"
import AppSidebar from "../components/AppSidebar"
import ArtistsTable from "../components/ArtistsTable"
import axios from '../lib/AxiosConfig'

const Artists = () => {
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        getAuthors();
    }, []);

    const getAuthors = async () => {
        try {
            const response = await axios.get(`/artists`);
            setAuthors(response.data);
        } catch (error) {
            setError(error.response);
            console.error(error);
        }
    }
    //console.log(authors);

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className='body flex-grow-1'>
                    <div className='container-lg px-4'>
                        <div className='row'>
                            <div className="col-12">
                                <ArtistsTable
                                    authors={authors}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Artists;