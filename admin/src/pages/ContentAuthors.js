import { useState, useEffect } from 'react';
import AppHeader from "../components/AppHeader"
import AppSidebar from "../components/AppSidebar"
import ContentAuthorsTable from "../components/ContentAuthorsTable"
import axios from '../lib/AxiosConfig'

const ContentAuthors = () => {
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

    const getAuthorsInfo = content.slice(0,2);
    //console.log(getAuthorsInfo);

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className='body flex-grow-1'>
                    <div className='container-lg px-4'>
                        <div className='row'>
                            <div className="col-12">
                                <ContentAuthorsTable
                                    contentAuthors={getAuthorsInfo}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentAuthors;