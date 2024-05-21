import { useState, useEffect } from 'react';
import AppHeader from "../components/AppHeader"
import AppFooter from "../components/AppFooter"
import AppSidebar from "../components/AppSidebar"
import MomentsTable from "../components/MomentsTable"
import axios from '../lib/AxiosConfig'

const Moments = () => {
    const [moments, setMoments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMoments();
    }, []);

    const getMoments = async () => {
        try {
            const response = await axios.get(`/moments`);
            setMoments(response.data);
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
                                <MomentsTable
                                    moments={moments}
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

export default Moments;