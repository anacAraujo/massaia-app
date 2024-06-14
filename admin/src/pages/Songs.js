import { useState, useEffect } from 'react';
import AppHeader from "../components/AppHeader"
import AppSidebar from "../components/AppSidebar"
import SongsTable from "../components/SongsTable"
import axios from '../lib/AxiosConfig'

const Songs = () => {
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSongs();
    }, []);

    const getSongs = async () => {
        try {
            const response = await axios.get(`/songs`);
            setSongs(response.data);
        } catch (error) {
            setError(error.response);
            console.error(error);
        }
    }
    console.log(songs);

    return (
        <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
            <AppHeader />
            <div className='body flex-grow-1'>
                <div className='container-lg px-4'>
                    <div className='row'>
                        <div className="col-12">
                            <SongsTable
                                songs={songs}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Songs;