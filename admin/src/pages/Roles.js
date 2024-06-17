import { useState, useEffect } from 'react';
import AppHeader from "../components/AppHeader"
import AppSidebar from "../components/AppSidebar"
import RolesTable from '../components/RolesTable';
import axios from '../lib/AxiosConfig'

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        getRoles();
    }, []);

    const getRoles = async () => {
        try {
            const response = await axios.get(`/roles`);
            setRoles(response.data);
        } catch (error) {
            setError(error.response);
            console.error(error);
        }
    }
    //console.log(roles);

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className='body flex-grow-1'>
                    <div className='container-lg px-4'>
                        <div className='row'>
                            <div className="col-12">
                                <RolesTable
                                    roles={roles}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Roles;