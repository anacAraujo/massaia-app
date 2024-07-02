import { useState, useEffect } from 'react';
import AppHeader from "../components/AppHeader"
import AppSidebar from "../components/AppSidebar"
import ContentAboutTable from "../components/ContentAboutTable"
import axios from '../lib/AxiosConfig'

const ContentAbout = () => {
    const [content, setContent] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        getContent();
    }, []);

    const getContent = async () => {
        try {
            const response = await axios.get(`/contents`);
            setContent(response.data);
        } catch (error) {
            setError(error.response);
            console.error(error);
        }
    }

    const getAboutInfo = content.slice(2);
    console.log(getAboutInfo);

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className='body flex-grow-1'>
                    <div className='container-lg px-4'>
                        <div className='row'>
                            <div className="col-12">
                                <ContentAboutTable
                                    contentAbout={getAboutInfo}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentAbout;